import React, { useState } from "react";
import styles from "./index.module.less";
import useEditStore from "src/store/editStore";
import EditCanvas from "./EditCanvas";
import EditCmp from "./EditCmp";
import EditMultiCmps from "./EditMultiCmps";
//画布
//单个组件
//多个组件
export default function RightSider() {
  const [showEdit, setShowEdit] = useState(false);

  //首先获取画布对象
  const [canvas, assembly] = useEditStore((state) => [
    state.canvas,
    state.assembly,
  ]);
  //获取尺寸
  const assemblySize = assembly.size;
  return (
    <div className={styles.main}>
      <div
        className={styles.switch}
        onClick={() => {
          setShowEdit(!showEdit);
        }}
      >
        {showEdit ? "隐藏编辑区域" : " 显示隐藏区域"}
      </div>
      {showEdit &&
        (assemblySize === 0 ? (
          <EditCanvas canvas={canvas} />
        ) : assemblySize === 1 ? (
          <EditCmp selectedCmp={canvas.cmps[Array.from(assembly)[0]]} />
        ) : (
          <EditMultiCmps />
        ))}
    </div>
  );
}
