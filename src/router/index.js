import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home.vue'
// import Serve from '@/components/serve/Serve.vue'
// import Complete from '@/components/complete/Complete.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/home/serve',
          name: 'serve',
          component: function (resolve) {
            require(['../components/serve/Serve.vue'], resolve)
          }
        },
        {
          path: '/home/complete',
          name: 'complete',
          component: function (resolve) {
            require(['../components/complete/Complete.vue'], resolve)
          }
        }
      ]
    },
    {
      path: '/',
      redirect: '/home'
    }
    // {
    //   path: '/home',
    //   name: 'Home',
    //   component: Home,
    //   children: [
    //     {
    //       path: 'serve',
    //       name: 'Serve',
    //       component: Serve
    //     },
    //     {
    //       path: 'complete',
    //       name: 'Complete',
    //       component: Complete
    //     }
    //   ]
    // },
  ]
})
