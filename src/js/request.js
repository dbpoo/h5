import "whatwg-fetch";
import "es6-promise";
import { Toast } from "vant";

const codeMessage = {
  200: "服务器成功返回请求的数据",
  201: "新建或修改数据成功",
  202: "一个请求已经进入后台排队（异步任务）",
  204: "删除数据成功",
  302: "Passport过期，重新鉴权",
  400: "发出的请求有错误，服务器没有进行新建或修改数据的操作",
  401: "用户没有权限（令牌、用户名、密码错误）",
  403: "用户得到授权，但是访问是被禁止的",
  404: "发出的请求针对的是不存在的记录，服务器没有进行操作",
  406: "请求的格式不可得",
  410: "请求的资源被永久删除，且不会再得到的",
  422: "当创建一个对象时，发生一个验证错误",
  500: "服务器发生错误，请检查服务器",
  501: "应用系统异常",
  502: "网关错误",
  503: "服务不可用，服务器暂时过载或维护",
  504: "网关超时",
};

const transformParams = (params = {}) => {
  let str = "";
  for (const key in params) {
    str += `&${key}=${params[key]}`;
  }
  return str;
};

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }
  const errortext = codeMessage[response.status] || response.statusText;
  // eslint-disable-next-line no-undef
  notification.error({
    message: `请求错误 ${response.status}: ${response.url}`,
    description: errortext,
  });
  const error = new Error(errortext);
  error.name = response.status;
  error.response = response;
  throw error;
};

function request(url, option, targetURL) {
  const options = {
    ...option,
  };
  const defaultOptions = {
    credentials: "include",
  };
  const newOptions = { ...defaultOptions, ...options };
  const { href } = window.location;
  const nextURL = targetURL || href;
  if (newOptions.method === "POST" || newOptions.method === "PUT" || newOptions.method === "DELETE") {
    if (!(newOptions.body instanceof FormData)) {
      newOptions.headers = {
        Accept: "application/json",
        "Content-Type": "application/json; charset=utf-8;",
        ...newOptions.headers,
      };
      if (newOptions.stringBody) {
        newOptions.body = transformParams(newOptions.body);
      } else {
        newOptions.body = JSON.stringify(newOptions.body);
      }
    } else {
      newOptions.headers = {
        Accept: "application/json",
        ...newOptions.headers,
      };
    }
  } else {
    newOptions.headers = {
      Accept: "application/json",
      ...newOptions.headers,
    };
  }

  return new Promise((resolve, reject) => {
    console.group("请求体start");
    console.log("url", url);
    console.log("option", JSON.stringify(newOptions));
    console.groupEnd();
    fetch(url, newOptions)
      .then(checkStatus)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        if (json.errorCode == "501") {
          const error = {
            retFlag: 0,
            errorMessage: codeMessage[json.errorCode],
          };
          Toast(codeMessage[json.errorCode]);
          reject(error);
        }
        if (json.errorCode == "302") {
          console.log("302");
        } else {
          resolve(json);
        }
      })
      .catch((err) => {
        reject(err);
        console.log("======接口出错 S======");
        console.log("接口url", url);
        console.log("入参", newOptions);
        console.log("错误信息", err);
        console.log("======接口出错 E======");
      });
  });
}

export default request;
