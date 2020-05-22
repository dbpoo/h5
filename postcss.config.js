const px2rem = require("postcss-px2rem");

module.exports = ({ file }) => {
  let rootValue;
  if (file && file.dirname && file.dirname.indexOf("vant") > -1) {
    rootValue = 37.5;
  } else {
    rootValue = 75;
  }
  return {
    plugins: [px2rem({ remUnit: rootValue })],
  };
};
