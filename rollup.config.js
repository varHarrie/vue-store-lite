import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';

const isProduction = process.env.NODE_ENV === 'production';

const sharedPlugins = [
  babel({ extensions: ['.js', '.ts'], babelHelpers: 'bundled' }),
  resolve({ extensions: ['.js', '.ts'] }),
  commonjs(),
  isProduction && terser(),
];

export default [
  // umd
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.umd.js',
      format: 'umd',
      name: 'VueStoreLite',
      globals: { vue: 'Vue' },
    },
    external: ['vue'],
    plugins: sharedPlugins,
  },
  // esm
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/index.esm.js',
      format: 'esm',
    },
    external: ['vue'],
    plugins: sharedPlugins,
  },
];
