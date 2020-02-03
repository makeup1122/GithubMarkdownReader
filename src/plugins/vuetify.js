import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import zhHans from 'vuetify/es5/locale/zh-Hans' // 加载Vuetify中文包
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
Vue.use(Vuetify)
export default new Vuetify({
  icons: {
    iconfont: 'mdi' // default - only for display purposes
  },
  lang: {
    locales: { zhHans },
    current: 'zhHans'
  },
  theme: {
    themes: {
      light: {
        // primary: '#0F4C82',
        // secondary: '#9C27B0',
        // accent: '#4caf50'
        // error: '#FF5252',
        // info: '#2196F3',
        // success: '#4CAF50',
        // warning: '#FFC107',
      }
    }
  }
})
