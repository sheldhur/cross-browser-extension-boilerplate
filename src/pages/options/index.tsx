import React from "react";
import { createRoot } from "react-dom/client";

import { OptionsPage } from "./options-page";
import './styles.css';

createRoot(document.querySelector("#__root")!).render(
  <>
    <OptionsPage />
  </>
);
