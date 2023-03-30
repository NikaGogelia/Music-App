import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import ContextProvider from "./context/ContextProvider";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <ContextProvider>
      <App />
    </ContextProvider>
  </StrictMode>
);
