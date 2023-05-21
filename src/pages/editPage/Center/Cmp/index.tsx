import { ICmpWithKey } from "src/store/editStoreTypes";
import styles from "./index.module.less";
import { isImgComponent, isTextComponent } from "src/pages/EditPage/LeftSider";
import React, { memo } from "react";
import { omit, pick } from "lodash";
import { Img, Text } from "./CmpDetail";
import classNames from "classnames";
import { setCmpSelected, setCmpsSelected } from "src/store/editStore";
interface ICmpProps {
  cmp: ICmpWithKey;
  index: number;
  isSelected: boolean;
}
const Cmp = memo((props: ICmpProps) => {
  const { cmp, index, isSelected } = props;
  const { style } = cmp;
  const setSelected = (e) => {
    if (e.ctrlKey) {
      setCmpsSelected([index]);
    } else {
      setCmpSelected(index);
    }
  };
  const outerStyle = pick(style, [
    "position",
    "top",
    "left",
    "width",
    "height",
  ]);

  const innerStyle = omit(style, "position", "top", "left");

  // 此处外层div使用组件的定位与宽高，如果选中，则显示边框。注意此处外层div的box-sizing: content-box;，因此外层div的实际宽高是组件宽高+border*2
  // 此处内层div使用外层定位即可，注意此处内层box-sizing: border-box;
  return (
    <div
      className={classNames(styles.main, isSelected && "selectedBorder")}
      style={outerStyle}
      onClick={setSelected}
    >
      <div className={styles.inner} style={{ ...innerStyle, zIndex: index }}>
        {cmp.type === isTextComponent && <Text {...cmp} />}
        {cmp.type === isImgComponent && <Img {...cmp} />}
      </div>
    </div>
  );
});
export default Cmp;
