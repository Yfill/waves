import CleanCSS from 'clean-css';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import babel from '@rollup/plugin-babel';
import sass from 'rollup-plugin-sass';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

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
const name = 'Waves';
const banner = `/*! ${pkg.name} v${pkg.version} | ${new Date().toGMTString()} | ${pkg.homepage} */`;
const proOutputOpt = {
  name,
  banner,
  exports: 'default',
  sourcemap: false,
};
export default {
  input: './src/index.ts',
  output: isProduction
    ? [
      {
        ...proOutputOpt,
        format: 'umd',
        file: 'dist/index.js',
      },
      {
        ...proOutputOpt,
        format: 'cjs',
        file: 'dist/index.cjs.js',
      },
      {
        ...proOutputOpt,
        format: 'es',
        file: 'dist/index.esm.js',
      },
    ]
    : {
      name,
      format: 'umd',
      file: 'node_modules/.waves/dist/index.js',
      sourcemap: true,
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
