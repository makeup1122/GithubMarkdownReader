import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
var routerInstance = new Router({
  routes: [
    { path: '/reader', name: 'Reader', component: () => import('./views/Reader.vue') },
    { path: '/home', alias: '', name: 'HomePage', component: () => import('./views/HomePage.vue') }
  ]
})
export default routerInstance
