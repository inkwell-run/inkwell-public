import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.tsx", "src/adapters/index.ts"],
  format: ["cjs", "esm"],
  clean: true,
  dts: true,
  loader: {
    ".svg": "dataurl",
  },
});
