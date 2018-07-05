// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import VueRouter from 'vue-router'
import App from './App'
import Home from './components/Home'
import Serve from './components/Serve'
import Complete from './components/Complete'
/**
 * 全局注册
 */
// import { Cell, Group } from 'vux'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/Serve',
    component: Serve
  },
  {
    path: '/Complete',
    component: Complete
  }
]

const router = new VueRouter({
  routes
})

FastClick.attach(document.body)

/**
 * 全局注册
 */
// Vue.component('cell', Cell)
// Vue.component('group', Group)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
