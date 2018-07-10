import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Serve from '@/components/Serve'
import Complete from '@/components/Complete'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/Serve',
      name: 'Serve',
      component: Serve
    },
    {
      path: '/Complete',
      name: 'Complete',
      component: Complete
    }
  ]
})
