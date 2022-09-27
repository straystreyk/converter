export type TMeta = {
  title: string;
  description?: string;
  ogTitle?: string;
  ogImage?: string;
};

export type TMetaObjects = {
  [p: string]: TMeta;
};

export const meta: TMetaObjects = {
  "/": {
    title: "MAINPAGE",
    description: "desc",
  },
};
