import {
  addNewNotify,
  removeNotify as removeNotifyReducer,
} from "../../store/slices/notifySlices";
import { useDispatch } from "../redux/common";
import { INotifyItem } from "../../@types/notify";

export const useNotify = () => {
  const dispatch = useDispatch();

  const removeNotify = (id: string | number) => {
    dispatch(removeNotifyReducer(id));
  };

  const addNotify = (item: INotifyItem, removeMS = 3000) => {
    dispatch(addNewNotify(item));

    setTimeout(() => {
      removeNotify(item.id);
    }, removeMS);
  };

  return {
    addNotify,
    removeNotify,
  };
};
