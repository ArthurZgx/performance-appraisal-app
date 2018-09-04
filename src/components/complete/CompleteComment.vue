<template>
  <div class="completeComment">
    <x-header :right-options="{showMore: false}"
              style="box-shadow: 0 2px 10px 0 rgba(0,0,0,0.10);margin-bottom: 15px;"
              @on-click-more="showMenus = true">
      绩效考评
    </x-header>
    <div class="content">
      <div class="completeComment_div" style="text-align: center;">{{userName}}{{month}}月工作完成度评价</div>
      <!-- 任务列表 -->
      <group v-for="(task,index) in taskList" label-width="100%" :title="'任务' + (index+1)" :key="index">
        <!--<cell primary="content" title="default" value="long "></cell>-->
        <cell :title="task.planContent" value-align="right">
          <div slot="inline-desc" style="margin-top: 6px;">
            <div style="margin-bottom: 17px;">
              <span style="margin-right: 5px;">权重</span> <span>{{task.weights}}%</span>
              <span style="margin-left: 10px;margin-right: 5px;">实际完成度</span> <span>{{task.completionRatio}}%</span>
            </div>
            <flexbox justify="flex-end" :gutter="20" style="margin-bottom: 20px;">
              <flexbox-item :span="2">
                <x-button style="width: 64px;font-size: 12px;"
                          :class="task.clickCompleted?'btn_hasCompleted':'btn_default'"
                          @click.native="hasCompleted(task)">完成
                </x-button>
              </flexbox-item>
              <flexbox-item :span="2">
                <x-button style="width: 64px;font-size: 12px;"
                          :class="task.clickNoCompleted?'btn_hasCompleted':'btn_default'"
                          @click.native="noCompleted(task)">未完成
                </x-button>
              </flexbox-item>
            </flexbox>
          </div>
        </cell>
      </group>
      <p  v-if="taskList.length" style="text-align: right;margin-bottom: 50px;margin-top: 17px;">最终系数 <span>{{totalCompleteRatio}}%</span></p>
      <!-- 保存提交按钮 -->
      <flexbox style="margin-bottom: 0;position:fixed;bottom:0;left:0;background:white;width:100%;padding:5px 0 5px">
        <flexbox-item>
          <x-button style="background: #f8f8f8;color: #333;width:80%"
                    @click.native="cancleEvent">取消
          </x-button>
        </flexbox-item>
        <flexbox-item>
          <x-button style="background: #3891F0;color: #fff;width:80%"
                    @click.native="submitEvent">提交
          </x-button>
        </flexbox-item>
      </flexbox>
      <!-- 取消提示 -->
      <toast v-model="showToast" type="text"
             :time="1500" is-show-mask :text="toastText"
             :width="toastWidth"
             @on-hide="toastHide"
             position="bottom">
      </toast>
      <!-- 点击未完成时的弹出框-->
      <confirm v-model="showConfirm"
               :close-on-confirm="false"
               show-input
               title="请打分（0~100的整数）"
               :input-attrs="{type: 'number',value: ''}"
               @on-cancel="cancelConfirm"
               @on-confirm="confirm"
               @on-show="confirmShow"
               @on-hide="confirmHide">
      </confirm>
    </div>
  </div>
</template>
<script>
  import { XHeader, Toast, Icon, XTable, Flexbox, FlexboxItem, XButton, Cell, Group, Confirm } from 'vux'
  import _ from 'lodash'
  import request from '@/utils/request'
  import { paramEncode, parseTime, isEmptyObject } from '@/utils'
  export default {
    name: 'completeComment',
    components: {
      XHeader,
      Icon,
      XTable,
      Cell,
      Group,
      XButton,
      Flexbox,
      Confirm,
      FlexboxItem,
      Toast
    },
    data() {
      return {
        currentTask: {}, // 点击未完成时的当前任务
        month: '', // 任务月份
        year: '', // 任务年份
        userName: '', // 被评价人姓名
        userId: '', // 被评价人id
        commentId: '', // 评价人id 即当前用户id
        showToast: false, // 提示隐
        toastWidth: '9em', // 提示阴影宽度
        toastText: '已取消', // 提示文字
        showConfirm: false, // 点击未完成的弹出框
        resultTable: {}, // 当前被评价人的几个任务对应的结果表数据
        evaluateTime: '', // 评价时间
        taskList: [
          // { taskName: '2018年是决胜全面建成小康社会、实施“十三五”规划承上启下的关键一年', weights: '10', order: 1, completionRatio: '', clickCompleted: false, clickNoCompleted: false },
          // { taskName: '第十二届全国人民代表大会第一次会议以来的五年，是我国发展进程中极不平凡的五年', weights: '20', order: 2, completionRatio: '', clickCompleted: false, clickNoCompleted: false },
          // { taskName: '五年来，经济实力跃上新台阶。国内生产总值从54万亿元增加到82.7万亿元，年均增长7.1%', weights: '30', order: 3, completionRatio: '', clickCompleted: false, clickNoCompleted: false },
          // { taskName: '五年来，创新驱动发展成果丰硕。全社会研发投入年均增长11%，规模跃居世界第二位', weights: '40', order: 4, completionRatio: '', clickCompleted: false, clickNoCompleted: false }
        ]
      }
    },
    created() {
      this.editTitle = localStorage.getItem('serveList')
      this.getCurrentTask()
      // var json = localStorage.getItem('jsonTemp')
      // json = JSON.parse(json)
      // console.log(json)
      // this.goodCommentNum = json.goodCommentNum
      // this.badCommentNum = json.badCommentNum
      // this.badCommentText = json.badCommentText
    },
    mounted() {
      console.log(this.$route.params.state)
      if (this.$route.params.state === undefined) {
        this.$router.go(-1)
      }
    },
    computed: {
      totalCompleteRatio: function() {
        let temp = 0
        _.each(this.taskList, function(item, key) {
          if (item.completionRatio) {
            temp += parseInt(item.completionRatio) * parseInt(item.weights) / 100
          }
        })
        return temp
      }
    },
    methods: {
      // 获取缓存中当前任务主表信息
      getCurrentTask() {
        const self = this
        self.currentTask = JSON.parse(localStorage.getItem('currentTask'))
        console.log('currentTask', this.currentTask)
        self.planAssessmentPlanId = self.currentTask.planAssessmentPlanId
        self.userName = self.currentTask.userName // 被评价人姓名
        self.userId = self.currentTask.userId // 被评价人id
        self.year = self.currentTask.year
        self.month = self.currentTask.month + ''
        self.month = self.currentTask.month.length > 1 ? self.month : '0' + self.currentTask.month
        self.getTasks()
      },
      // 获取当前评价人的所有任务
      getTasks() {
        const self = this
        self.commentId = localStorage.getItem('userId')
        const filters = {
          'main_job_detail': {
            'main_job_service_evaluation_id': { equalTo: self.currentTask.id },
            'user_id': { equalTo: self.commentId },
            'status': { equalTo: '0' }
          }
        }
        request('main_job_details', {
          params: { filters: filters }
        }).then(res => {
          console.log(res)
          console.log('所有任务', res.data)
          const allTask = res.data
          if (allTask.length) {
            _.each(allTask, function(item, key) {
              item.clickCompleted = false
              item.clickNoCompleted = false
              item.completionRatio = 0 // 每个任务的实际完成度
              // item.coefficient = 0 // 每个任务的系数
              self.taskList.push(item)
            })
          }
        })
      },
      // 完成函数
      hasCompleted(task) {
        task.clickCompleted = !task.clickCompleted
        task.clickNoCompleted = false
        task.completionRatio = task.completionRatio === 100 ? 0 : 100
      },
      // 未完成函数
      noCompleted(task) {
        this.showConfirm = true
        this.currentTask = task
        // task.completionRatio = ''
        // task.clickNoCompleted = !task.clickNoCompleted
        task.clickCompleted = false
      },
      // 弹出框点击确定时
      confirm(value) {
        console.log('点击确定', typeof value)
        // 如果存在小数点 禁止提交
        if (value.indexOf('.') > 0) {
          return
        }
        // 数字必须0-100之间
        if (parseInt(value) > 100 || parseInt(value) < 0) {
          return
        }
        if (value) {
          this.currentTask.completionRatio = value
          this.currentTask.clickNoCompleted = true
        }
        this.showConfirm = false
        console.log(this.currentTask)
      },
      // 弹出框点击取消时
      cancelConfirm(value) {
        console.log('取消', value)
        this.currentTask.clickNoCompleted = false
        this.currentTask.completionRatio = 0
      },
      // 弹出框显示时
      confirmShow() {
        console.log('显示')
      },
      // 弹出框隐藏时
      confirmHide() {
        console.log('隐藏')
        this.currentTask = {}
      },
      // 提示信息隐藏
      toastHide() {
        if (this.toastText === '提交成功') {
          this.$router.push({ name: 'completeCommentResult' })
        }
      },
      getTime() {
        const self = this
        request('extends/getDate').then(res => {
          if (!isEmptyObject(res)) {
            self.evaluateTime = res.data
          }
          self.editStatus()
          console.log('时间', res)
        })
      },
      // 取消
      cancleEvent() {
        console.log('取消')
        const self = this
        if (self.taskList.length < 1) return
        _.each(self.taskList, function(item, key) {
          item.clickCompleted = false
          item.clickNoCompleted = false
          item.completionRatio = 0
        })
        self.toastWidth = '9em'
        self.toastText = '已取消'
        self.showToast = true
      },
      // 提交
      submitEvent() {
        // const json = list
        const self = this
        if (self.taskList.length < 1) return
        console.log('点了提交', self.taskList)
        // 判断是否有未打分的任务
        if (!self.judgeAllTask()) {
          self.toastWidth = '11em'
          self.toastText = '请完成所有任务打分'
          self.showToast = true
          return
        }
        // 修改各个任务明细表状态
        // self.editStatus()
        // 先获取服务器时间  再修改状态
        self.getTime()
        // 提交成功 提示
        self.toastWidth = '7em'
        self.toastText = '提交成功'
        self.showToast = true

        const resultDetail = {
          totalCompleteRatio: self.totalCompleteRatio,
          userName: self.userName,
          month: self.month
        }

        // 存储
        localStorage.setItem('taskList', JSON.stringify(self.taskList))
        localStorage.setItem('resultDetail', JSON.stringify(resultDetail))
      },
      // 提交之前 判断是否有没打分的任务 如果有 禁止提交
      judgeAllTask() {
        const self = this
        for (let i = 0; i < self.taskList.length; i++) {
          if (self.taskList[i].clickCompleted === false && self.taskList[i].clickNoCompleted === false) {
            return false
          }
        }
        return true
      },
      // 提交完成修改status
      editStatus() {
        const self = this
        let params = []
        // 状态修改为2 计算得分
        _.each(self.taskList, function(item, key) {
          const temp = {}
          temp.id = item.id
          temp.status = 2
          temp.evaluationTime = self.evaluateTime
          temp.completionRatio = item.completionRatio
          temp.scoreScore = parseInt(item.weights) * parseInt(item.completionRatio) / 100
          params.push(temp)
        })

        params = JSON.stringify(params)
        console.log(params)
        // 批量修改明细表
        request('main_job_details/edit/batch', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          params: { params: params },
          transformRequest: paramEncode
        }).then(res3 => {
          console.log('修改状态成功', res3.data)
          console.log('时间', res3.headers.date)
          // self.editEvaluateTime(res3.headers.date)

          // const evaluateYear = res
        })
      },
      // 提交后 存储评价时间
      editEvaluateTime(dateString) {
        if (!dateString) return
        const date = new Date(dateString)
        const evaluateTime = parseTime(date)
        console.log(393, evaluateTime)
        request('main_job_service_evaluations/' + this.currentTask.id + '/edit', {
          method: 'POST',
          params: { evaluationTime: evaluateTime },
          headers: { 'X-Auth-Token': '7235ba9e71f7493d9d56b29401d9f47c' },
          transformRequest: paramEncode
        }).then(res => {
          console.log('添加评价时间成功', res)
        })
      }
    }
  }
</script>

<style>
.completeComment_div {
  text-align: center;
  padding: 10px 0;
  /*border: 1px solid #eee;*/
  margin-top: 19px;
  margin-bottom: 21px;
}
.content {
  padding: 0 10px;
}
.completeComment .btn_hasCompleted {
  background-color: #3891f0;
  color: #fff;
}
.completeComment .weui-toast{
  border-radius: 25px;
}
.completeComment .btn_default {
  color: #333;
}
.completeComment .weui-cells:before {
  border-top: none;
}
/*56,145,240, 0.5*/
.completeComment .weui-cells:after {
  border-bottom: 1px solid rgba(56, 145, 240, 0.5);
}
</style>
