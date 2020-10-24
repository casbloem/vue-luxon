import buble from '@rollup/plugin-buble';
import {
  terser
} from "rollup-plugin-terser";
export default {
  input: 'src/vue-luxon.js',
  external: ['luxon'],
  plugins: [
    buble()
  ],
  output: [{
    file: 'dist/vue-luxon.js',
    format: 'cjs'
  }, {
    file: 'dist/vue-luxon.min.js',
    format: 'cjs',
    plugins: [
      terser()
    ]
  }]
};