import './index.scss';

function attr(el: Element, prop: string, value: string): void
function attr(el: Element, prop: string): string | null
function attr(el: Element, prop: string, value?: string) {
  return value === undefined
    ? el.getAttribute(prop)
    : el.setAttribute(prop, value);
}

function removeAttr(el: Element, prop: string) {
  return el.removeAttribute(prop);
}

function on(
  el: Element | Window,
  type: string,
  handler: EventListenerOrEventListenerObject,
  opt?: AddEventListenerOptions | boolean,
) {
  return el.addEventListener(type, handler, opt);
}

function off(
  el: Element | Window,
  type: string,
  handler: EventListenerOrEventListenerObject,
  opt?: EventListenerOptions | boolean,
) {
  return el.removeEventListener(type, handler, opt);
}

function getElRect(el: Element) {
  return el.getBoundingClientRect();
}

const giveName = (mark: string) => {
  const prefix = 'y-waves';
  return `${prefix}${mark ? `-${mark}` : ''}`;
};

export {
  attr,
  removeAttr,
  on,
  off,
  getElRect,
  giveName,
};
