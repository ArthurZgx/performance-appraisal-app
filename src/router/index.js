import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)

// import Home from '@/components/home/Home.vue'
// import Serve from '@/components/serve/Serve.vue'
// import ServeComment from '@/components/serve/ServeComment.vue'
// import ServeCommentSuccess from '@/components/serve/ServeCommentSuccess.vue'
// import ServeCommentResult from '@/components/serve/ServeCommentResult.vue'
// import Personal from '@/components/personal/Personal.vue'
// import EvaluationType from '@/components/evaluationType/EvaluationType.vue'
// import EvaluationRecord from '@/components/evaluationRecord/EvaluationRecord.vue'
// import EvaluationRecordDetail from '@/components/evaluationRecord/EvaluationRecordDetail.vue'
// import SubmitEvaluation from '@/components/submitEvaluation/SubmitEvaluation.vue'
// import UnsubmittedEvaluation from '@/components/unsubmittedEvaluation/UnsubmittedEvaluation.vue'
// import UnsubmittedEvaluationDetail from '@/components/unsubmittedEvaluation/UnsubmittedEvaluationDetail.vue'
// import EvaluationResult from '@/components/evaluationResult/EvaluationResult.vue'
// import PersonalInfo from '@/components/personalInfo/PersonalInfo.vue'
// import Complete from '@/components/complete/Complete.vue'
// import ServeEvaluate from '@/components/serveEvaluate/ServeEvaluate.vue'
// import CompleteComment from '@/components/complete/CompleteComment.vue'
// import CompleteCommentSuccess from '@/components/complete/CompleteCommentSuccess.vue'
// import CompleteCommentResult from '@/components/complete/CompleteCommentResult.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/home',
      name: 'home',
      component: _import('home/Home')
    },
    {
      path: '/serve',
      name: 'serve',
      component: _import('serve/Serve')
    },
    {
      path: '/serveComment',
      name: 'serveComment',
      component: _import('serve/ServeComment')
    },
    {
      path: '/serveCommentSuccess',
      name: 'serveCommentSuccess',
      component: _import('serve/ServeCommentSuccess')
    },
    {
      path: '/serveCommentResult',
      name: 'serveCommentResult',
      component: _import('serve/ServeCommentResult')
    },
    {
      path: '/complete',
      name: 'complete',
      component: _import('complete/Complete')
    },
    {
      path: '/completeComment',
      name: 'completeComment',
      component: _import('complete/CompleteComment')
    },
    {
      path: '/completeCommentSuccess',
      name: 'completeCommentSuccess',
      component: _import('complete/CompleteCommentSuccess')
    },
    {
      path: '/completeCommentResult',
      name: 'completeCommentResult',
      component: _import('complete/CompleteCommentResult')
    },
    {
      path: '/personal',
      name: 'personal',
      component: _import('personal/Personal')
    },
    {
      path: '/evaluationType',
      name: 'evaluationType',
      component: _import('evaluationType/EvaluationType')
    },
    {
      path: '/evaluationRecord',
      name: 'evaluationRecord',
      component: _import('evaluationRecord/EvaluationRecord')
    },
    {
      path: '/evaluationRecord/detail',
      name: 'evaluationRecordDetail',
      component: _import('evaluationRecord/EvaluationRecordDetail')
    },
    {
      path: '/submitEvaluation',
      name: 'submitEvaluation',
      component: _import('submitEvaluation/SubmitEvaluation')
    },

    {
      path: '/unsubmittedEvaluation',
      name: 'unsubmittedEvaluation',
      component: _import('unsubmittedEvaluation/UnsubmittedEvaluation')
    },
    {
      path: '/unsubmittedEvaluation/detail',
      name: 'unsubmittedEvaluationDetail',
      component: _import('unsubmittedEvaluation/UnsubmittedEvaluationDetail')
    },

    {
      path: '/evaluationResult',
      name: 'evaluationResult',
      component: _import('evaluationResult/EvaluationResult')
    },
    {
      path: '/personalInfo',
      name: 'personalInfo',
      component: _import('personalInfo/PersonalInfo')
    },
    {
      path: '/serveEvaluate',
      name: 'serveEvaluate',
      component: _import('serveEvaluate/ServeEvaluate')
    },
    {
      path: '/bindingPhone',
      name: 'bindingPhone',
      component: _import('bindingPhone/bindingPhone')
    },
    {
      path: '/alreadyBound',
      name: 'alreadyBound',
      component: _import('bindingPhone/alreadyBound')
    },
    {
      path: '/userJobComplete',
      name: 'userJobComplete',
      component: _import('userJobComplete/userJobComplete')
    },
    {
      path: '/userJobCompleteResult',
      name: 'userJobCompleteResult',
      component: _import('userJobComplete/userJobCompleteResult')
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
