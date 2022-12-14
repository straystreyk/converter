import { useDispatch } from "./redux/common";
import { updateSidebar } from "../store/slices/sidebarSlice";
import { ISidebar } from "../@types/sidebar";

export const useSidebar = () => {
  const dispatch = useDispatch();

  const update = (newOpts: ISidebar) => {
    dispatch(updateSidebar(newOpts));
  };

  return {
    update,
  };
};
