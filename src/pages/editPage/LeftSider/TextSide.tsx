import { defaultComponentStyle } from "src/utils/const";
import leftSideStyles from "./leftSide.module.less";
import { memo } from "react";
import useEditStore from "src/store/editStore";
import { isTextComponent } from ".";
import { ICmp } from "src/store/editStoreTypes";
import { addCmp } from "src/store/editStore";
const defaultStyle = {
  ...defaultComponentStyle,
  width: 170,
  height: 30,
  lineHeight: "30px",
  fontSize: 12,
  fontWeight: "normal",
  textDecoration: "none",
  color: "#000",
  backgroundColor: "#ffffff00",
  textAlign: "left",
  wordSpacing: "10px",
};
const settings = [
  {
    value: "双击编辑标题",
    style: {
      ...defaultStyle,
      fontSize: 28,
      height: 50,
      lineHeight: "50px",
    },
  },
  {
    value: "双击编辑正文",
    style: defaultStyle,
  },
];
const TextSide = memo(() => {
  //控制store的行为，使textSide不必每次都重新render 2023-04-18
  //避免过度使用hooks，将addCmp抽出 2023-04-20
  // const { addCmp } = useEditStore(
  //   (state) => state,
  //   () => {
  //     return true;
  //   }
  // );
  const onDragStart = (e: any, _cmp: any) => {
    e.dataTransfer.setData("drag-cmp", JSON.stringify(_cmp));
  };
  console.log("TextSide render");
  return (
    <div className={leftSideStyles.main}>
      <ul className={leftSideStyles.box}>
        {settings.map((item) => (
          <li
            draggable="true"
            key={item.value}
            className={leftSideStyles.item}
            onClick={() =>
              addCmp({ type: isTextComponent, ...item } as unknown as ICmp)
            }
            onDragStart={(e) =>
              onDragStart(e, { ...item, type: isTextComponent })
            }
          >
            {item.value.indexOf("双击编辑") > -1
              ? item.value.slice(4)
              : item.value}
          </li>
        ))}
      </ul>
    </div>
  );
});
export default TextSide;
