import React from "react";
import ReactDOM from "react-dom/client";
import { FetchPrivateImageExample } from "./FetchPrivateImageExample";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <FetchPrivateImageExample />
  </React.StrictMode>
);
