import {
  type TypedUseSelectorHook,
  useDispatch as useDispatchR,
  useSelector as useSelectorR,
} from "react-redux";
import { StoreDispatch, StoreStateType } from "../../store/store";

export const useDispatch = () => useDispatchR<StoreDispatch>();
export const useSelector: TypedUseSelectorHook<StoreStateType> = useSelectorR;
