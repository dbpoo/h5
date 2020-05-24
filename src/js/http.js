import { stringify } from "qs";
import request from "./request";

const http = {
  get: (url, params) => {
    let requestUrl = url;
    const options = {
      method: "GET"
    };
    if (params) {
      requestUrl = `${url}?${stringify(params)}`;
    }
    return request(requestUrl, options);
  },
  post: (url, params = {}, opt = {}) => {
    const requestUrl = url;
    let options = {
      method: "POST"
    };
    if (opt.stringBody) {
      options = {
        ...options,
        cotnentType: "application/x-www-form-urlencoded",
        dataType: "json",
        body: params
      };
    } else {
      options = {
        ...options,
        cotnentType: "application/json;charset=utf-8",
        dataType: "json",
        body: params
      };
    }
    return request(requestUrl, options);
  },
  put: (url, params = {}, opt = {}) => {
    const requestUrl = url;
    let options = {
      method: "PUT"
    };
    if (opt.stringBody) {
      options = {
        ...options,
        cotnentType: "application/x-www-form-urlencoded",
        dataType: "json",
        body: params
      };
    } else {
      options = {
        ...options,
        cotnentType: "application/json;charset=utf-8",
        dataType: "json",
        body: params
      };
    }
    return request(requestUrl, options);
  }
};

export default http;
