module.exports = {
  publicPath: process.env.VUE_APP_GHPAGES === "yes"
    ? '/blackperl/'
    : '/',
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
  }
};
