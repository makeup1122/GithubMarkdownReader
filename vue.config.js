const path = require('path')
const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin')
module.exports = {
  publicPath: '/GithubMarkdownReader/',
  productionSourceMap: false, // 弃掉生产环境的 source map
  outputDir: 'docs',
  transpileDependencies: [ 'vuetify' ],
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
