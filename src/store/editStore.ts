import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { EditStoreAction, EditStoreState, ICanvas, ICmp } from "./editStoreTypes";
import { getOnlyKey } from "src/utils";

const useEditStore = create(
  immer<EditStoreState & EditStoreAction>((set: any) => ({
    canvas: getDefaultCanvas(),
    addCmp: (_cmp:ICmp) => {
      set((draft) => {
        draft.canvas.cmps.push({ ..._cmp, key: getOnlyKey() });
      });
    },
  }))
);
export default useEditStore
function getDefaultCanvas(): ICanvas {
  return {
    title: "未命名",
    style: {
      width: 320,
      height: 568,
      backgroundColor: "#ffffff",
      backgroundImage: "",
      backgroundPosition: "center",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
    },
    // 组件
    cmps: [],
  };
}

