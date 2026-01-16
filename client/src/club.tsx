import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import ClubPage from "./ClubPage";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ClubPage />
  </StrictMode>,
);
