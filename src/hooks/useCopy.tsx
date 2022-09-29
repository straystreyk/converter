import { useNotify } from "./notify";
import { copyToClipBoard } from "../utils/converter";
import { INotifyItem } from "../@types/notify";

export const useCopy = () => {
  const { addNotify } = useNotify();

  const copy = async (value: string, item?: INotifyItem) => {
    if (!value) return;
    await copyToClipBoard(value);
    addNotify(
      item && Object.keys(item).length
        ? item
        : { id: Date.now(), text: "Successfully copied", type: "success" }
    );
  };

  return {
    copy,
  };
};
