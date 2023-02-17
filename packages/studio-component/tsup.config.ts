import cssModulesPlugin from "esbuild-css-modules-plugin";
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  clean: true,
  dts: true,
  loader: {
    ".svg": "dataurl",
  },
});
