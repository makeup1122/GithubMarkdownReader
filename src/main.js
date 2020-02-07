import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from '@/plugins/vuetify'
import Mixin from './mixins/repo.js'
import Octicons from './components/Octicons.vue'
Vue.config.productionTip = false
Vue.component('Octicons', Octicons)
Vue.mixin(Mixin)
new Vue({
  vuetify,
  router,
  store,
  render: function (h) { return h(App) }
}).$mount('#app')
