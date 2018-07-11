import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home.vue'
import Serve from '@/components/serve/Serve.vue'
import Personal from '@/components/personal/Personal.vue'
import EvaluationRecord from '@/components/evaluationRecord/EvaluationRecord.vue'
import EvaluationResult from '@/components/evaluationResult/EvaluationResult.vue'
import PersonalInfo from '@/components/personalInfo/PersonalInfo.vue'
import Complete from '@/components/complete/Complete.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/serve',
      name: 'serve',
      component: Serve
    },
    {
      path: '/complete',
      name: 'complete',
      component: Complete
    },
    {
      path: '/personal',
      name: 'personal',
      component: Personal
    },
    {
      path: '/evaluationRecord',
      name: 'evaluationRecord',
      component: EvaluationRecord
    },
    {
      path: '/evaluationResult',
      name: 'evaluationResult',
      component: EvaluationResult
    },
    {
      path: '/personalInfo',
      name: 'personalInfo',
      component: PersonalInfo
    },
    // {
    //   path: '/home',
    //   name: 'Home',
    //   component: Layout,
    //   children: [
    //     {
    //       path: '/home/serve',
    //       name: 'serve',
    //       component: Serve
    //     },
    //     {
    //       path: '/home/complete',
    //       name: 'complete',
    //       component: Complete
    //     }
    //   ]
    // },
    {
      path: '/',
      redirect: '/home'
    }
  ]
})
