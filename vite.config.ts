import { defineConfig } from "vite";

export default defineConfig({
  root: ".",
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
      fileName: () => "Savant-Card.js",
    },
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: true,
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      },
    },
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: [],
    include: ["test/**/*.test.ts"],
  },
});
