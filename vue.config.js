const path = require('path')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
module.exports = {
  devServer: {
    disableHostCheck: true,
    port: 8080
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.join(__dirname, './src')
      }
    },
    plugins: [
      new VuetifyLoaderPlugin()
    ]
  }
}
