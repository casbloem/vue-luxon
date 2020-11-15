import buble from "@rollup/plugin-buble";
import { terser } from "rollup-plugin-terser";
export default {
    input: "src/main.js",
    external: ["luxon"],
    plugins: [buble()],
    output: [
      {
        file: "dist/vue-luxon.cjs.js",
        format: "cjs",
        exports: "default",
      },
      {
        file: "dist/vue-luxon.cjs.min.js",
        format: "cjs",
        exports: "default",
        plugins: [terser()],
      },
      {
        file: "dist/vue-luxon.esm.js",
        format: "esm",
        exports: "default",
      },
      {
        file: "dist/vue-luxon.esm.min.js",
        format: "esm",
        exports: "default",
        plugins: [terser()],
      },
    ],
};
