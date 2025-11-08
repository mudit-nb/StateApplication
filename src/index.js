import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import StateApplication from "./StateApplication";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <StateApplication />
  </StrictMode>
);
