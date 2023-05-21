import useEditStore, {
  updateAssemblyCmpsByDistance,
} from "src/store/editStore";
import styles from "./index.module.less";
import { throttle } from "lodash";
import useZoomStore from "src/store/zoomStore";
import StretchDots from "./StretchDots";
export default function EditBox() {
  const [cmps, assembly] = useEditStore((state) => [
    state.canvas.cmps,
    state.assembly,
  ]);

  const zoom = useZoomStore((state) => state.zoom);
  //再画布上移动组件位置
  const onMouseDownOfCmp = (e) => {
    // //阻止其他组件的选中行为
    // e.preventDefault();
    let startX = e.pageX;
    let startY = e.pageY;

    let hasMoved = false;
    const move = throttle((e) => {
      hasMoved = true;
      const x = e.pageX;
      const y = e.pageY;

      let disX = x - startX;
      let disY = y - startY;
      disX = disX * (100 / zoom);
      disY = disY * (100 / zoom);
      updateAssemblyCmpsByDistance({ top: disY, left: disX });

      startX = x;
      startY = y;
    }, 50);

    const up = () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  };
  const size = assembly.size;
  if (size === 0) {
    return null;
  }
  //多个组件吗，要统计外层的框宽高
  let top = 9999,
    left = 9999,
    bottom = -9999,
    right = -9999;
  //求出画布里组件right和bottom的最大值，那就是editBox的尺寸
  assembly.forEach((index) => {
    const cmp = cmps[index];
    top = Math.min(top, cmp.style.top);
    left = Math.min(left, cmp.style.left);

    bottom = Math.max(bottom, cmp.style.top + cmp.style.height);
    right = Math.max(right, cmp.style.left + cmp.style.width);
  });
  //边框
  let width = right - left + 8;
  let height = bottom - top + 8;
  top -= 4;
  left -= 4;

  return (
    <div
      className={styles.main}
      style={{
        zIndex: 99999,
        top,
        left,
        width,
        height,
      }}
      onMouseDown={onMouseDownOfCmp}
    >
      <StretchDots zoom={zoom} style={{ width, height }} />
    </div>
  );
}
