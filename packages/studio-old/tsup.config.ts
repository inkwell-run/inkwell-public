import { defineConfig } from "tsup";
import { $ } from "zx";
import cssModulesPlugin from "esbuild-css-modules-plugin";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  clean: true,
  // don't generate dts with tsup, instead generate dts and dts maps with tsc
  // dts: true,
  onSuccess: async () => {
    $`tsc`;
  },
  esbuildPlugins: [cssModulesPlugin()],
  loader: {
    ".svg": "dataurl",
  },
});
