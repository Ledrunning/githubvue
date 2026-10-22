import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// base "./" lets the build work on GitHub Pages (user site or project subpath)
export default defineConfig({ base: "./", plugins: [vue()] });
