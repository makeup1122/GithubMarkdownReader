import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
var routerInstance = new Router({
  routes: [
    { path: '/', redirect: { name: 'HomePage' } },
    { path: '/reader', name: 'Reader', component: () => import('./views/Reader.vue') },
    { path: '/home', name: 'HomePage', component: () => import('./views/HomePage.vue') },
    { path: '/test', name: 'Test', component: () => import('./views/Test.vue') }
  ]
})
export default routerInstance
