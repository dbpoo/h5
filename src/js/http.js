import { stringify } from "qs";
import _ from "lodash";
import configApis from "./interface";
import request from "./request";

const vueHttp = {};
_.each(configApis, (v, k) => {
  vueHttp[k] = params => {
    let url = v.url;
    let method = _.toLower(v.method || "get");
    let requestUrl = url;
    let targetURL = v.targetURL;
    let option = {
      method: _.toUpper(v.method),
      headers: {
        ...v.headers
      },
      stringBody: v.stringBody,
      needPassport: v.needPassport
    };
    if (method == "get") {
      if (params) {
        requestUrl = `${url}?${stringify(params)}`;
      }
    } else if (method == "post") {
      if (v.stringBody) {
        option = {
          ...option,
          cotnentType: "application/x-www-form-urlencoded",
          dataType: "json",
          body: params
        };
      } else {
        option = {
          ...option,
          cotnentType: "application/json;charset=utf-8",
          dataType: "json",
          body: params
        };
      }
    }
    return request(requestUrl, option, targetURL);
  };
});

export default vueHttp;
