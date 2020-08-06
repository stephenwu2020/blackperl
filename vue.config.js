module.exports = {
  publicPath: process.env.VUE_APP_PUBLIC_PATH || "/",
  devServer: {
    disableHostCheck: true
  },
  pluginOptions: {
    autoRouting: {
      chunkNamePrefix: "page-"
    },
    i18n: {
      locale: "en",
      fallbackLocale: "en",
      localeDir: "locales",
      enableInSFC: false
    }
  },
  chainWebpack: config => {
    config.module
      .rule("raw-loader")
      .test(/\.(md)(\?.*)?$/)
      .use("raw-loader")
      .loader("raw-loader")
      .end();
  }
};
