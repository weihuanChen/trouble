import { defaultComponentStyle } from "src/utils/const";
import { isGraphComponent } from ".";
import { addCmp } from "src/store/editStore";
import leftSideStyles from "./leftSide.module.less";
import { memo } from "react";
import { ICmp } from "src/store/editStoreTypes";

const defaultStyle = {
  ...defaultComponentStyle,
  width: 120,
  height: 120,
  borderColor: "blue",
  backgroundColor: "blue",
};

const settings = [
  {
    key: "graph0",
    value: "",
    style: {
      ...defaultStyle,
      borderWidth: 1,
      borderStyle: "solid",
      backgroundColor: "transparent",
    },
  },
  {
    key: "graph1",
    value: "",
    style: defaultStyle,
  },
];

// 前端算法实战
const arithmetic = [
  "金九银十",
  "前端算法实战-buy.webp",
  "前端算法实战-title",
  "前端算法实战",
  "balloon-1",
  "balloon-2",
  "balloon-green",
  "cloud",
  "fairytale.webp",
  "five-balls",
  "flower",
  "girl-balloon",
  "green-learning",
  "heart-balloon",
  "prince",
  "red-flower",
  "ribbons",
  "up",
  "wing",
];

const GraphSide = memo(() => {
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
  console.log("GraphSide render");
  return (
    <div className={leftSideStyles.main}>
      <ul className={leftSideStyles.box}>
        {settings.map((item) => (
          <li
            draggable="true"
            key={item.value}
            className={leftSideStyles.item}
            onClick={() =>
              addCmp({ type: isGraphComponent, ...item } as unknown as ICmp)
            }
            onDragStart={(e) =>
              onDragStart(e, { ...item, type: isGraphComponent })
            }
            style={{
              width: item.style.width,
              height: item.style.height,
              backgroundColor: item.style.backgroundColor,
              borderStyle: item.style.borderStyle,
              borderColor: item.style.borderColor,
            }}
          ></li>
        ))}
      </ul>
    </div>
  );
});
export default GraphSide;
