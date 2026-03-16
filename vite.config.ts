import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [react()],
  publicDir: path.resolve(__dirname, "public"),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "client", "src"),
    },
  },
  root: path.resolve(__dirname, "client"),
  server: {
    port: 5000,
    host: true,
  },
  build: {
    // Keep the build output in the conventional dist/ directory so Vercel
    // and local tooling agree on where the static site is emitted.
    outDir: path.resolve(__dirname, "dist"),
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "client", "index.html"),
        about: path.resolve(__dirname, "client", "about.html"),
        club: path.resolve(__dirname, "client", "club.html"),
        changelog: path.resolve(__dirname, "client", "changelog.html"),
      },
    },
  },
});
