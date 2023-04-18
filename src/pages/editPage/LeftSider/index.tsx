import { memo, useEffect, useState } from "react";
import styles from "./index.module.less";
import classNames from "classnames";
import TextSide from "./TextSide";

//组件类型
export const isTextComponent = 1;
export const isImgComponent = 2;
export const isGraphComponent = 3;

//使用memo防止无脑更新
const LeftSider = memo(() => {
  //切换显示的组件类型
  const [showSide, setShowSide] = useState(0);

  const _setShowSide = (which: number | undefined) => {
    if (showSide === which) {
      setShowSide(0);
    } else {
      setShowSide(which || 0);
    }
  };

  useEffect(() => {
    //中心区点击时，隐藏编辑区的部分内容
    const cancelShow = () => setShowSide(0);
    document.getElementById("center")?.addEventListener("click", cancelShow);
    return () => {
      document
        .getElementById("center")
        ?.removeEventListener("click", cancelShow);
    };
  }, []);
  console.log("left render");

  return (
    <div className={styles.main}>
      <ul className={styles.cmps}>
        <li
          className={classNames(
            styles.cmp,
            showSide === isTextComponent ? styles.selected : ""
          )}
          onClick={() => _setShowSide(isTextComponent)}
        >
          <i className={classNames("iconfont icon-wenben", styles.cmpIcon)}></i>
          <span className={styles.cmpText}>文本</span>
        </li>
        <li
          className={classNames(
            styles.cmp,
            showSide === isImgComponent ? styles.selected : ""
          )}
          onClick={() => _setShowSide(isImgComponent)}
        >
          <i className={classNames("iconfont icon-tupian", styles.cmpIcon)}></i>
          <span className={styles.cmpText}>图片</span>
        </li>
        <li
          className={classNames(
            styles.cmp,
            showSide === isGraphComponent ? styles.selected : ""
          )}
          onClick={() => _setShowSide(isGraphComponent)}
        >
          <i
            className={classNames("iconfont icon-graphical", styles.cmpIcon)}
          ></i>
          <span className={styles.cmpText}>图形</span>
        </li>
      </ul>
      {showSide === isTextComponent && <TextSide />}
    </div>
  );
});
export default LeftSider;
