import { create } from "zustand";
import axios from "axios";
import { hideLoading, showLoading } from "src/store/globalStore";
import docCookies from "src/utils/cookies";
import { message } from "antd";

const Axios = axios.create({
  timeout: 20000,
});
Axios.interceptors.request.use(
  (config: any) => {
    if (config.headers.globalLoading !== false) {
      showLoading();
    }
    config.headers.Authorization = docCookies.getItem("sessionId");
    return config;
  },
  (err) => {
    if (err.config.headers.globalLoading !== false) {
      hideLoading();
    }
    return Promise.reject(err);
  }
);

Axios.interceptors.response.use(
  (res: any) => {
    if (res.config.headers.globalLoading !== false) {
      hideLoading();
    }
    if (res.status === 200) {
      let code = res.data.code;
      if (code === 200) {
        return res.data.result;
      } else if (code === 401) {
        message.info("请先登录");
      } else {
        message.warning(res.data.msg || "信息有误,失败");
      }
    } else {
      message.warning(res.data.msg || "信息有误,失败");
    }
  },
  (err) => {
    if (err.config.headers.gloablLoading !== false) {
      hideLoading();
    }
    return Promise.reject(err);
  }
);

export default Axios;
