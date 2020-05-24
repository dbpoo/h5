import _ from "lodash";

// get sessionStorage
export const get = name => {
  const res = sessionStorage.getItem(name);
  if (!_.isEmpty(res)) {
    try {
      return JSON.parse(res);
    } catch (error) {
      return res;
    }
  }
  return null;
};

// set sessionStorage
export const set = (key, value) => {
  let newVal = value;
  if (_.isObject(value)) {
    newVal = JSON.stringify(value);
  }
  sessionStorage.setItem(key, newVal);
};
