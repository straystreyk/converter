import { TConvertTypes } from "../@types/converter";

export const convert = (value: string, type: TConvertTypes) => {
  if (typeof window === "undefined") throw new Error("window is not defined");
  if (type === "svg") return "data:image/svg+xml;base64," + window.btoa(value);

  return window.btoa(value);
};
