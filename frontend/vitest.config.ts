import { defineConfig } from "vitest/config";
import marko from "@marko/vite";

export default defineConfig({
  plugins: [marko()],
  test: {
    globals: true,
    coverage: {
      include: ["src/**/*"],
      exclude: ["src/@types", "src/**/types.ts", "src/**/mocks.ts", "src/**/stories.ts", "src/**/fixtures/*"],
      reporter: ["text", "html"],
    },
  },
});
