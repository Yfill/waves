import CleanCSS from 'clean-css';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import sass from 'rollup-plugin-sass';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

const isProduction = process.env.NODE_ENV === 'production';
const basePlugins = [
  typescript(),
  resolve(),
  commonjs(),
  babel({
    exclude: [
      'node_modules/**',
    ],
    babelHelpers: 'bundled',
    extensions: [
      '.ts',
    ],
  }),
  sass({
    insert: true,
    processor: (css) => (isProduction ? new CleanCSS().minify(css).styles : css),
  }),
];
const developmentPlugins = [
];
const productionPlugins = [
  terser(),
];
export default {
  input: './src/index.ts',
  output: {
    name: 'Waves',
    format: 'umd',
    file: isProduction ? 'dist/index.js' : 'node_modules/.waves/dist/index.js',
    sourcemap: !isProduction,
  },
  plugins: [
    ...basePlugins,
    ...(
      isProduction
        ? productionPlugins
        : developmentPlugins
    ),
  ],
};
