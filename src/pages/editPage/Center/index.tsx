import React from "react";
import styles from "./index.module.less";
import Canvas from "./Canvas";
import useEditStore, { setAllCmpSelected, setCmpSelected } from "src/store/editStore";
import Zoom from "./Zoom";
import useZoomStore from "src/store/zoomStore";

export default function Center() {
  const canvas = useEditStore((state) => state.canvas);
  const {zoom, zoomIn, zoomOut} = useZoomStore();
  const keyEvent = (e) => {
    if (
      (e.target as Element).nodeName === "INPUT" ||
      (e.target as Element).nodeName === "TEXTAREA"
    ) {
      return;
    }

    if (e.ctrlKey) {
      switch (e.code) {
        case "KeyA":
          // 选中所有组件
          setAllCmpSelected();
          return;
        case "Equal":
          zoomOut();
          e.preventDefault();
          return;

        case "Minus":
          zoomIn();
          e.preventDefault();
          return;
      }
    }
  };
  return (
    <div
      id="center"
      className={styles.main}
      tabIndex={0}
      onClick={(e: any) => {
        if ((e.target as Element).id === "center") {
          setCmpSelected(-1);
        }
      }}
      style={{
        minHeight: (zoom / 100) * canvas.style.height + 100,
      }}
      onKeyDown={keyEvent}
    >
      <Canvas />
      <Zoom />
    </div>
  );
}

