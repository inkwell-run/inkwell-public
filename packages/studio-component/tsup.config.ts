import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.tsx"],
  format: ["cjs", "esm"],
  clean: true,
  dts: true,
  loader: {
    ".svg": "dataurl",
  },
});
