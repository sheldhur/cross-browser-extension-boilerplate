import React from "react";
import { createRoot } from "react-dom/client";

import { NewtabPage } from "./newtab-page";
import './styles.less';

createRoot(document.querySelector("#__root")!).render(
  <>
    <NewtabPage />
  </>
);
