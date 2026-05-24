import { defineConfig } from "vite";

export default defineConfig({
  root: ".",
  build: {
    lib: {
      entry: "src/index.ts",
      formats: ["es"],
      fileName: () => "savant-energy-breaker-board-card.js",
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
