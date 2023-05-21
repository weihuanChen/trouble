import { useEffect } from "react";
import Cmp from "../Cmp";
import styles from "./index.module.less";
import useEditStore, { clearCanvas, fetchCanvas } from "src/store/editStore";
import { addCmp } from "src/store/editStore";
import { useCanvasId } from "src/store/hook";
import EditBox from "../EditBox";
import useZoomStore from "src/store/zoomStore";
export default function Canvas() {
  const zoom = useZoomStore((state) => state.zoom);
  const [canvas, assembly] = useEditStore((state) => [
    state.canvas,
    state.assembly,
  ]);
  const { cmps, style } = canvas;
  const id = useCanvasId();
  useEffect(() => {
    if (id) {
      fetchCanvas(id);
    } else {
      clearCanvas();
    }
  }, []);
  const onDrop = (e: any) => {
    //1读取背拖拽的组件信息
    let dragCmp = e.dataTransfer.getData("drag-cmp");

    if (!dragCmp) {
      return;
    }
    dragCmp = JSON.parse(dragCmp);
    //2读取用户松手的位置，他是一个相对于画布的位置
    const endX = e.pageX;
    const endY = e.pageY;

    const canvasDOMPos = {
      top: 114,
      left: (document.body.clientWidth - style.width) / 2,
    };

    let disX = endX - canvasDOMPos.left;
    let disY = endY - canvasDOMPos.top;

    dragCmp.style.left = disX - dragCmp.style.width / 2;
    dragCmp.style.top = disY - dragCmp.style.height / 2;

    //3把组件存到state store
    addCmp(dragCmp);
  };
  const allowDraop = (e: any) => {
    e.preventDefault();
  };
  return (
    <div
      id="canvas"
      className={styles.main}
      style={{ ...canvas.style, transform: `scale(${zoom / 100})` }}
      onDrop={onDrop}
      onDragOver={allowDraop}
    >
      <EditBox />
      {cmps.map((item, index) => (
        <Cmp
          key={item.key}
          cmp={item}
          index={index}
          isSelected={assembly.has(index)}
        ></Cmp>
      ))}
    </div>
  );
}
