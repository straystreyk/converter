import { StoreStateType } from "./store/store";

export declare global {
  var _SSR_STORE_STATE_: StoreStateType;
  var initialI18nStore: { [p: string]: any };
  var initialLanguage: string;
}
