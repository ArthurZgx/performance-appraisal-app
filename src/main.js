// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import router from './router/index'
/**
 * 全局注册
 */
// import { Cell, Group } from 'vux'
// import _ from 'lodash'

// const router = new VueRouter({
//   routes
// })

FastClick.attach(document.body)

/**
 * 全局注册
 */
// Vue.component('cell', Cell)
// Vue.component('group', Group)
// Vue.component('_', _)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
