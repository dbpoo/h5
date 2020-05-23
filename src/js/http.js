import { stringify } from "qs";
import request from "./request";

const http = {
  get: (url, params, opt) => {
    let requestUrl = url;
    let options = {
      method: "GET",
      headers: {
        ...opt.headers,
      },
    };
    if (params) {
      requestUrl = `${url}?${stringify(params)}`;
    }
    return request(requestUrl, options);
  },
  post: (url, params, opt) => {
    let requestUrl = url;
    let options = {
      method: "POST",
      headers: {
        ...opt.headers,
      },
    };
    if (opt.stringBody) {
      options = {
        ...options,
        cotnentType: "application/x-www-form-urlencoded",
        dataType: "json",
        body: params,
      };
    } else {
      options = {
        ...options,
        cotnentType: "application/json;charset=utf-8",
        dataType: "json",
        body: params,
      };
    }
    return request(requestUrl, options);
  },
};

export default http;
