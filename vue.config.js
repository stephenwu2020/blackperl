module.exports = {
  publicPath: process.env.NODE_ENV === 'gh-pages'
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
