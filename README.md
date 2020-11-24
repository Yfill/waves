# [Waves](https://yfill.cn/waves)

[![GitHub license][mit]][mit-url]
[![Code Style][code-style]][code-style-url]
[![NPM Package][npm]][npm-url]
[![Monthly Downloads][md]][md-url]
[![Build Size][build-size]][build-size-url]
[![Dependencies Status][dependencies-status]][dependencies-status-url]
[![DevDependencies Status][dev-dependencies-status]][dev-dependencies-status-url]

Click the wave effect.

## Install

using npm:

```sh
npm install @yfill/waves --save
```

or using yarn:

```sh
yarn add @yfill/waves
```

## Usage

- Import resources and execute the run method.

  ```js
  import Waves from "@yfill/waves";
  Waves.run();
  ```

  ```html
  <script src="https://unpkg.com/@yfill/waves" onload="Waves.run();"></script>
  ```

- Set the waves attribute on the tag
  ```
  y-waves-[?(light|dark|main)]
  y-waves-box-shadow
  ```

## Code example

```html
<div class="item" y-waves>waves default</div>
<div class="item" y-waves-light>waves light</div>
<div class="item" y-waves-dark>waves dark</div>
<div class="item" y-waves-main>waves main</div>
<div class="item" y-waves y-waves-box-shadow>waves box shadow</div>
<img
  src="https://images.unsplash.com/photo-1606054512716-fb198b6686c9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80"
  y-waves
/>
```

[mit]: https://img.shields.io/badge/license-MIT-blue.svg
[mit-url]: https://github.com/Yfill/waves/blob/main/LICENSE
[code-style]: https://img.shields.io/badge/code_style-airbnb-brightgreen
[code-style-url]: https://www.npmjs.com/package/eslint-config-airbnb
[md]: https://badgen.net/npm/dm/@yfill/waves
[md-url]: https://npmcharts.com/compare/@yfill/waves?minimal=true
[npm]: https://img.shields.io/npm/v/@yfill/waves.svg
[npm-url]: https://www.npmjs.com/package/@yfill/waves
[build-size]: https://badgen.net/bundlephobia/minzip/@yfill/waves
[build-size-url]: https://bundlephobia.com/result?p=@yfill/waves
[dependencies-status]: https://david-dm.org/Yfill/waves/status.svg
[dependencies-status-url]: https://david-dm.org/Yfill/waves
[dev-dependencies-status]: https://david-dm.org/Yfill/waves/dev-status.svg
[dev-dependencies-status-url]: https://david-dm.org/Yfill/waves?type=dev
