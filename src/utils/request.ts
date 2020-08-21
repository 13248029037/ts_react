import Axios, { AxiosResponse } from "axios";
import { message } from "antd";
import { IRequestRes, IOpts } from "@/utils/request.interface";
import Setting from "@/store/setting";
import eventEmiter from "@/utils/eventEmiter";
import { getQueryString } from "@/utils/function";
// 默认的参数
const defaultopts = {
  timeout: 60000,
};
interface IOAuthData {
  code?: number;
  total?: number;
  data: any;
}

// 添加一个响应拦截器 用来处理oauth 鉴权  1.2 版本

Axios.interceptors.request.use(
  (config) => {
    if (config.method === "get") {
      config.data = config.params;
    }
    if (config.data && config.data.noLoading) {
      return config;
    }
    Setting.setGlobalLoadingVisible(true);
    let s = setTimeout(() => {
      Setting.setGlobalLoadingVisible(false);
      clearTimeout(s);
    }, 6000);
    return config;
  },
  (err) => Promise.reject(err)
);
Axios.interceptors.response.use(
  (res: AxiosResponse<IRequestRes<IOAuthData>>) => {
    Setting.setGlobalLoadingVisible(false);
    const data = res.data;
    switch (data.code) {
      case 401:
        let pathname = window.location.pathname;
        if (!getQueryString("redirect") && pathname !== "/user/login") {
          eventEmiter.emit(
            "redirect",
            `/user/login?redirect=${encodeURIComponent(
              window.location.pathname + window.location.search
            )}`
          );
        }
        break;
      case 403:
        break;
    }
    //如果有分页total
    if (typeof res.data.total === "number") {
      res.data.data = {
        data: res.data.data,
        total: res.data.total,
      };
    }
    return res;
  }
);

const Request = <T>(opts: IOpts): Promise<T> => {
  // 默认method
  opts.method = (opts.method || "GET").toLocaleUpperCase() as IOpts["method"];
  opts = {
    ...defaultopts,
    ...opts,
  };
  // 返回一个promise 用来 await调用
  return new Promise((resolve, reject) => {
    Axios(opts)
      .then((res: AxiosResponse<IRequestRes<T>>) => {
        if (
          res.status === 200 &&
          res.data.code !== 200 &&
          res.data.code !== 0
        ) {
          message.error(res.data.error || "后端请求出现问题");
          reject(res.data.error);
          return;
        }
        resolve(res.data.data);
      })
      .catch((err) => {
        // 默认直接弹框报错
        message.error("网络繁忙，请稍后再试！");
        reject(err);
      });
  });
};

export default Request;
