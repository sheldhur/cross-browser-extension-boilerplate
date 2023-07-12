import React from "react";
import { createRoot } from "react-dom/client";

import { HistoryPage } from "./history-page";
import './styles.css';

createRoot(document.querySelector("#__root")!).render(
  <>
    <HistoryPage />
  </>
);
