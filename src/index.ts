import {
  attr, removeAttr, on, off, getElRect, giveName,
} from './util';

interface WavesParams {
  markId: string,
  size: number,
  x: number,
  y: number,
  pkg: Element,
  box: Element,
  target: Element
}

const LOGO = giveName('');
const MAIN = giveName('main');
const LIGHT = giveName('light');
const DARK = giveName('dark');
const ITEM = giveName('item');
const MARK_ID = giveName('mark-id');
const BOX = giveName('item-box');
const BOX_INNER = giveName('item-box-inner');
const SUPPORT = giveName('support');
const ACTIVE = giveName('active');

let id = 0;

let wavesInstance: Waves | null = null;

const createId = () => `${++id}`;

const markTargetMap: { [id: string]: Element } = {};

const markBoxMap: { [id: string]: Element } = {};

const checkAttr = (value: string) => !({
  null: true, undefined: true, false: true,
} as { [prop: string]: boolean })[value];

const createItemBox = (target: Element): Element => {
  const markId = createId();
  const el = document.createElement('div');
  const pkg = document.createElement('div');
  const tagName = target.tagName.toLowerCase();
  attr(target, MARK_ID, markId);
  attr(pkg, BOX_INNER, '');
  attr(pkg, MARK_ID, markId);
  attr(el, BOX, '');
  attr(el, MARK_ID, markId);
  el.appendChild(pkg);
  markTargetMap[id] = target;
  markBoxMap[id] = el;
  if (
    ({ img: true, video: true } as { [prop: string]: boolean })[tagName]
  ) target.parentNode?.appendChild(el);
  else target.appendChild(el);
  return el;
};

const createWaves = ({
  markId, size, x, y, pkg, box, target,
}: WavesParams): Element => {
  const waves = document.createElement('span');
  let wavesColor: null | string = attr(target, LOGO);
  if (!wavesColor && checkAttr(`${attr(target, MAIN)}`)) wavesColor = wavesInstance?.mainColor || null;
  attr(waves, MARK_ID, markId);
  attr(waves, ITEM, '');
  attr(waves, 'style', `height:${size}px;width:${size}px;left:${x}px;top:${y}px;${wavesColor ? `background-color:${wavesColor};` : ''}`);
  on(waves, 'animationend', () => {
    pkg.removeChild(waves);
    if (!pkg.children.length && box) {
      box.parentNode?.removeChild(box);
      removeAttr(target, MARK_ID);
      delete markBoxMap[markId];
      delete markTargetMap[markId];
    }
  }, { once: true });
  return waves;
};

const computeWavesParams = (
  clientX: number,
  clientY: number,
  markId: string,
  target: Element,
): WavesParams => {
  const {
    top, left, width, height,
  } = getElRect(target);
  const x = clientX - left;
  const y = clientY - top;
  let box = markBoxMap[markId];
  if (!box) box = createItemBox(target);
  markId = attr(box, MARK_ID) || '';
  const pkg = box.children[0];
  const size = (
    Math.max(left + width - clientX, clientX - left) ** 2
    + Math.max(top + height - clientY, clientY - top) ** 2
  ) ** 0.5 * 2;
  return {
    markId, size, x, y, pkg, box, target,
  };
};

const computePkgStyle = (target: Element, itemBox: Element) => {
  const {
    left, top, width, height,
  } = getElRect(target);
  const {
    left: boxLeft, top: boxTop,
  } = getElRect(itemBox);
  const {
    borderRadius, zIndex,
  } = window.getComputedStyle(target);
  return `left:${left - boxLeft}px;top:${top - boxTop}px;height:${height}px;width:${width}px;border-radius:${borderRadius || '0'};z-index:${zIndex};`;
};

const getTarget = (el: Element, markId: string): Element | null => {
  const target = markTargetMap[markId];
  if (target) return target;
  const wavesAttr = attr(el, LOGO)
    ?? attr(el, LIGHT)
    ?? attr(el, DARK)
    ?? attr(el, MAIN)
    ?? 'null';
  if (checkAttr(wavesAttr)) return el;
  if (el === document.body || el === document.documentElement || !el.parentNode) return null;
  return getTarget(el.parentNode as Element, markId);
};

const handler = (evt: Event) => {
  const e = (evt as MouseEvent);
  if (e.button !== 0) return;
  const el = e.target as Element;
  const markId = attr(el, MARK_ID) || '';
  const target = getTarget(el, markId);
  if (!target || checkAttr(`${attr(target, 'disabled')}`)) return;
  const wavesParams = computeWavesParams(e.clientX, e.clientY, markId, target);
  const waves = createWaves(wavesParams);
  const { pkg, box } = wavesParams;
  attr(target, ACTIVE, '');
  on(window, 'mouseup', () => removeAttr(target, ACTIVE), { once: true });
  attr(pkg, 'style', computePkgStyle(target, box));
  pkg.appendChild(waves);
};

export default class Waves {
  mainColor: string | undefined

  static run(mainColor?: string) {
    return new Waves(mainColor);
  }

  static destroy() {
    return wavesInstance?.destroy();
  }

  constructor(mainColor?: string) {
    if (wavesInstance) return wavesInstance;
    const docEl = document.documentElement;
    if ('animation' in docEl.style) {
      this.mainColor = mainColor;
      wavesInstance = this;
      on(window, 'mousedown', handler);
      attr(docEl, SUPPORT, 'true');
    }
  }

  destroy() {
    off(window, 'mousedown', handler);
  }
}
