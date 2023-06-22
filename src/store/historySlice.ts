import { useEditStore } from "src/store/editStore";
import { EditStoreState } from "./editStoreTypes";

//最长历史记录
const maxCanvasChangeHistory = 100;

//历史
export const recordCanvasChangeHistory = (draft: EditStoreState) => {
  // 在撤销回退过程中，此时历史下标为currentIndex，如果此时用户又去修改画布或者组件属性，
  // 重新插入了新的历史进来，那么把currentIndex之后的记录全部删除，再把新的画布数据插入进来。
  const canvasChangeHistory = draft.canvasChangeHistory;

  draft.canvasChangeHistory = canvasChangeHistory.slice(
    0,
    draft.canvasChangeHistoryIndex + 1
  );

  //记录canvas和选中元素的下标
  draft.canvasChangeHistory.push({
    canvas: draft.canvas,
    assembly: draft.assembly,
  });
  draft.canvasChangeHistoryIndex++;
  //越出最大宽度，删除第0个元素
  if (draft.canvasChangeHistory.length > maxCanvasChangeHistory) {
    draft.canvasChangeHistory.shift();
    draft.canvasChangeHistoryIndex--;
  }
};
//回到上一步
export const goPrevCanvasHistory = () => {
  useEditStore.setState((draft) => {
    let newIndex = draft.canvasChangeHistory - 1;

    if (newIndex < 0) {
      newIndex = 0;
    }

    if (draft.canvasChangeHistoryIndex === newIndex) {
      return;
    }

    const item = draft.canvasChangeHistory[newIndex];

    draft.canvas = item.canvas;
    draft.assembly = item.assembly;
    draft.canvasChangeHistoryIndex = newIndex;
  });
};
//下一步
export const goNextCanvasHistory = () => {
  useEditStore.setState((draft) => {
    let newIndex = draft.canvasChangeHistoryIndex + 1;
    if (newIndex >= draft.canvasChangeHistory.length) {
      newIndex = draft.canvasChangeHistory.length - 1;
    }
    if (newIndex === draft.canvasChangeHistoryIndex) {
      return;
    }
    const item = draft.canvasChangeHistory[newIndex];
    draft.canvas = item.canvas;
    draft.assembly = item.assembly;
    draft.canvasChangeHistoryIndex = newIndex;
  });
};
