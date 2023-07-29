import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";

export default {
  input: "./out-tsc/index.js",
  output: {
    dir: "dist",
  },
  plugins: [resolve(), terser()],
};
