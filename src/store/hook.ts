import { isString } from "antd/es/button";
import { useSearchParams } from "react-router-dom";

//获取画布唯一标识
export function useCanvasId(): number | null {
  const [params] = useSearchParams();
  let id: any = params.get("id");

  if (isString(id)) {
    id = parseInt(id);
  }
  return id;
}

//页面 或者 模板，如果为空，则认为是模板
export function useCanvasType() {
  const [params] = useSearchParams();
  let type = params.get("type");
  return type || "content";
}
