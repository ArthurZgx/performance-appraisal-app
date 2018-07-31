import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Home.vue'
import Serve from '@/components/serve/Serve.vue'
import ServeComment from '@/components/serve/ServeComment.vue'
import ServeCommentSuccess from '@/components/serve/ServeCommentSuccess.vue'
import ServeCommentResult from '@/components/serve/ServeCommentResult.vue'
import Personal from '@/components/personal/Personal.vue'
import EvaluationType from '@/components/evaluationType/EvaluationType.vue'
import EvaluationRecord from '@/components/evaluationRecord/EvaluationRecord.vue'
import EvaluationRecordDetail from '@/components/evaluationRecord/EvaluationRecordDetail.vue'
import SubmitEvaluation from '@/components/submitEvaluation/SubmitEvaluation.vue'
import UnsubmittedEvaluation from '@/components/unsubmittedEvaluation/UnsubmittedEvaluation.vue'
import UnsubmittedEvaluationDetail from '@/components/unsubmittedEvaluation/UnsubmittedEvaluationDetail.vue'
import EvaluationResult from '@/components/evaluationResult/EvaluationResult.vue'
import PersonalInfo from '@/components/personalInfo/PersonalInfo.vue'
import Complete from '@/components/complete/Complete.vue'
import ServeEvaluate from '@/components/serveEvaluate/ServeEvaluate.vue'
import CompleteComment from '@/components/complete/CompleteComment.vue'
import CompleteCommentSuccess from '@/components/complete/CompleteCommentSuccess.vue'
import CompleteCommentResult from '@/components/complete/CompleteCommentResult.vue'



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
      path: '/serveComment',
      name: 'serveComment',
      component: ServeComment
    },
    {
      path: '/serveCommentSuccess',
      name: 'serveCommentSuccess',
      component: ServeCommentSuccess
    },
    {
      path: '/serveCommentResult',
      name: 'serveCommentResult',
      component: ServeCommentResult
    },
    {
      path: '/complete',
      name: 'complete',
      component: Complete
    },
    {
      path: '/completeComment',
      name: 'completeComment',
      component: CompleteComment
    },
    {
      path: '/completeCommentSuccess',
      name: 'completeCommentSuccess',
      component: CompleteCommentSuccess
    },
    {
      path: '/completeCommentResult',
      name: 'completeCommentResult',
      component: CompleteCommentResult
    },
    {
      path: '/personal',
      name: 'personal',
      component: Personal
    },
    {
      path: '/evaluationType',
      name: 'evaluationType',
      component: EvaluationType
    },
    {
      path: '/evaluationRecord',
      name: 'evaluationRecord',
      component: EvaluationRecord
    },
    {
      path: '/evaluationRecord/detail',
      name: 'evaluationRecordDetail',
      component: EvaluationRecordDetail
    },
    {
      path: '/submitEvaluation',
      name: 'submitEvaluation',
      component: SubmitEvaluation
    },

    {
      path: '/unsubmittedEvaluation',
      name: 'unsubmittedEvaluation',
      component: UnsubmittedEvaluation
    },
    {
      path: '/unsubmittedEvaluation/detail',
      name: 'unsubmittedEvaluationDetail',
      component: UnsubmittedEvaluationDetail
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
    {
      path: '/serveEvaluate',
      name: 'serveEvaluate',
      component: ServeEvaluate
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
