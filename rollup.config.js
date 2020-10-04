import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import { terser } from 'rollup-plugin-terser'
import banner from 'rollup-plugin-banner'
import nodePolyfills from 'rollup-plugin-node-polyfills'

export default {
  input: 'index.js',
  output: [
    // 1. Full browser build
    {
      file: 'dist/shapeshifter.js',
      format: 'umd',
      name: 'Shapeshifter',
      globals: {
        bsv: 'bsvjs'
      }
    },
    // 2. Minimised browser build
    {
      file: 'dist/shapeshifter.min.js',
      format: 'iife',
      name: 'Shapeshifter',
      globals: {
        bsv: 'bsvjs'
      },
      plugins: [
        terser()
      ]
    }
  ],
  external: ['bsv'],
  plugins: [
    resolve({ browser: true }),
    commonjs(),
    babel({
      exclude: 'node_modules/**',
      babelHelpers: 'bundled'
    }),
    nodePolyfills(),
    banner('shapeshifter.js - v<%= pkg.version %>\n<%= pkg.description %>\n<%= pkg.repository %>\nCopyright © <%= new Date().getFullYear() %> Chronos Labs Ltd. Apache-2.0 License')
  ]
}
