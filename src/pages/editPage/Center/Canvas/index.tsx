import styles from "./index.module.less";
import useEditStore from "src/store/editStore";

export default function Canvas() {
  const { canvas } = useEditStore();
  const { cmps } = canvas;
  return (
    <div id="canvas" className={styles.main} style={canvas.style}>
      {cmps.map((item) => (
        <div key={item.key}>{item.value}</div>
      ))}
    </div>
  );
}
