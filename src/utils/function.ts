import { message } from "antd";
import JSEncrypt from "jsencrypt";
import { pubKey } from "@/config";
import moment from "moment";
export const getQueryString = (name: string): string | null => {
  const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  const r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return unescape(r[2]);
  }
  return null;
};
export const debounce = (fn: (params?) => void, time: number = 300) => {
  let timer: NodeJS.Timeout = null;
  return (value: string) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      fn(value);
      clearTimeout(timer);
    }, time);
  };
};
export const throttle = (fn: (params?) => void, time: number = 300) => {
  let timer: NodeJS.Timeout = null;
  return (value: string) => {
    if (timer) {
      return;
    }
    timer = setTimeout(() => {
      fn(value);
      clearTimeout(timer);
    }, time);
  };
};
export const Trim = (str: string) => {
  return str.replace(/(^\s*)|(\s*$)/g, "");
};
export const fetchRequest = async (url: string, token: string) => {
  try {
    return fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      mode: "cors",
      cache: "default",
    });
  } catch (error) {
    message.error(error);
  }
};
export const encryptionData = (data: string) => {
  const encrypt = new JSEncrypt();
  encrypt.setPublicKey(pubKey);
  return encrypt.encrypt(data);
};
export const sleep = (times: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, times);
  });
};
export const computedTimeToString = (startTime: string, endTime: string) => {
  const startTimeTemp = moment(startTime).format("YYYY-MM-DD HH:mm") + ":00";
  const endTimeTemp = moment(endTime).format("YYYY-MM-DD HH:mm") + ":00";
  const totalMinutes =
    (moment(endTimeTemp).valueOf() - moment(startTimeTemp).valueOf()) / 60000;
  const hour = Math.floor(totalMinutes / 60);
  const min = Math.floor(totalMinutes % 60);
  return {
    totalMinutes,
    timeStr: `${hour}时${min}分`,
  };
};
export const requestAnimFrame = (function () {
  return (
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    function (a) {
      return window.setTimeout(a, 1e3 / 60, new Date().getTime());
    }
  );
})();
export const cancelAnimFrame = (function () {
  return (
    window.cancelAnimationFrame ||
    window.webkitCancelAnimationFrame ||
    function (id: number) {
      clearTimeout(id);
    }
  );
})();
export function compose(...args) {
  let functionMap = args || [];
  return function (x) {
    return functionMap.reduceRight((front, next) => {
      return next(front);
    }, x);
  };
}
