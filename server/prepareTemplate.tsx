import fs from "fs";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { initStore, StoreStateType } from "../src/store/store";
import { App } from "../src/components/app";
import { Request } from "express";
import { TMeta } from "./meta";

import en from "../src/i18n/en.json";
import i18n from "../src/i18n";

export const prepareTemplate = async (
  preloadedState: StoreStateType,
  req: Request,
  meta: TMeta
) => {
  const indexHTML = fs.readFileSync(
    path.resolve(__dirname, "../client/start-page.html"),
    {
      encoding: "utf8",
    }
  );

  const appHTML = ReactDOMServer.renderToString(
    <StaticRouter location={req.originalUrl}>
      <Provider store={initStore(preloadedState)}>
        <I18nextProvider i18n={i18n}>
          <App />
        </I18nextProvider>
      </Provider>
    </StaticRouter>
  );

  return indexHTML
    .replace(
      '<div id="app"></div>',
      `
      <div id="app">${appHTML}</div>
      <script type="text/javascript">
      window._SSR_STORE_STATE_ = 
      ${JSON.stringify(initStore(preloadedState).getState())};
      </script>
      <script type="text/javascript"> 
        window.initialI18nStore = ${JSON.stringify(en)};
        window.initialLanguage = "en";
      </script> 
    `
    )
    .replace("__META_TITLE__", meta.title)
    .replace("__META_DESCRIPTION__", meta.description ?? "")
    .replace("__META_OG_TITLE__", meta.ogTitle ?? "")
    .replace("__META_OG_IMAGE__", meta.ogImage ?? "");
};
