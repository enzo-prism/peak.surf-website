import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import ChangelogPage from "./ChangelogPage";
import "./index.css";

const container = document.getElementById("root")!;
const tree = (
  <StrictMode>
    <ChangelogPage />
    <Analytics />
  </StrictMode>
);

// dist/*.html is prerendered by scripts/prerender.mjs, so the normal path is a
// hydrate. The createRoot branch keeps `vite dev` (which serves the empty shell)
// working.
if (container.firstChild) {
  hydrateRoot(container, tree);
} else {
  createRoot(container).render(tree);
}
