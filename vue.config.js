module.exports = {
  publicPath: "./",
  filenameHashing: false,
  css: {
    loaderOptions: {
      less: {
        // 若使用 less-loader@5，请移除 lessOptions 这一级，直接配置选项。
        modifyVars: {
          // 直接覆盖变量
          "text-color": "#010101",
          green: "#007586"
        }
      }
    }
  }
};
