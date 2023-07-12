import React from "react";
import { createRoot } from "react-dom/client";

import { PopupPage } from "./popup-page";
import './styles.scss';

createRoot(document.querySelector("#__root")!).render(
  <>
    <PopupPage />
  </>
);
