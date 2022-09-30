import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { App } from "./components/app";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { initStore } from "./store/store";
import "./i18n";

import "./index.module.scss";

const container = document.getElementById("app") as HTMLElement;

const AppToRender = () => {
  return (
    <BrowserRouter>
      <Provider store={initStore(window._SSR_STORE_STATE_)}>
        <App />
      </Provider>
    </BrowserRouter>
  );
};

const root = ReactDOM.hydrateRoot(container, <AppToRender />);
