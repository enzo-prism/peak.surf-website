import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

import { pageByFile, pages, renderHead } from "./client/src/seo/pages";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const HEAD_PLACEHOLDER = "<!--peak:head-->";

// Every page's <head> SEO tags come from client/src/seo/pages.ts, so titles,
// canonicals, social cards, and structured data cannot drift between pages.
function peakSeoHead(): Plugin {
  return {
    name: "peak-seo-head",
    transformIndexHtml: {
      order: "pre",
      handler(html, ctx) {
        const file = path.basename(ctx.filename);
        const page = pageByFile(file);
        if (!page) {
          throw new Error(`peak-seo-head: ${file} is not registered in client/src/seo/pages.ts`);
        }
        if (!html.includes(HEAD_PLACEHOLDER)) {
          throw new Error(`peak-seo-head: ${file} is missing the ${HEAD_PLACEHOLDER} placeholder`);
        }
        return html.replace(HEAD_PLACEHOLDER, renderHead(page));
      },
    },
  };
}

export default defineConfig({
  plugins: [react(), peakSeoHead()],
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
      // One HTML entry per registered page (index.html, features.html, ...).
      input: Object.fromEntries(
        pages.map((page) => [
          page.file === "index.html" ? "main" : page.file.replace(/\.html$/, ""),
          path.resolve(__dirname, "client", page.file),
        ]),
      ),
    },
  },
});
