import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
var routerInstance = new Router({
  // mode: 'history',
  routes: [
    { path: '/', redirect: { name: 'HomePage' } },
    { path: '/reader', name: 'Reader', component: () => import('./views/Reader.vue') },
    { path: '/home', name: 'HomePage', component: () => import('./views/HomePage.vue') }
  ],
  scrollBehavior (to, from, savedPosition) {
    if (to.hash) {
      return {
        selector: to.hash
      }
    } else if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  }
})
export default routerInstance
