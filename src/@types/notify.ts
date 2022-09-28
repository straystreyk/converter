export interface INotifyProps {
  items: INotifyItem[];
}

export interface INotifyItem {
  type: "success" | "error";
  text: string;
  id: number | string;
}
