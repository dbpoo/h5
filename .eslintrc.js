module.exports = {
  root: true,
  env: {
    node: true
  },
  globals: {
    $http: true
  },
  extends: ["plugin:vue/essential", "@vue/standard"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    quotes: 0,
    semi: 0,
    "space-before-function-paren": 0,
    eqeqeq: 0
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
