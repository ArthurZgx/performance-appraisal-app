<template>
  <div class="completeCommentResult">
    <x-header :right-options="{showMore: true}"
              :left-options="{preventGoBack: true}"
              style="box-shadow: 0 2px 10px 0 rgba(0,0,0,0.10);margin-bottom: 15px;"
              @on-click-back="gotToTaskList"
              @on-click-more="showMenus = true">
      绩效考评
    </x-header>
    <div class="completeCommentResult_div" style="text-align: center;">{{resultDetail.userName}}{{resultDetail.month}}月工作完成度评价</div>
    <x-table full-bordered style="margin:0 auto;width:90%;">
      <thead>
      <tr>
        <td class="task">任务</td>
        <td class="proportion">权重</td>
        <td class="hasDone">实际完成度</td>
      </tr>
      </thead>
      <tbody>
      <tr v-for="task in taskList">
        <td>{{task.taskName}}</td>
        <td>{{task.weights}}%</td>
        <td>{{task.completionRatio}}%</td>
      </tr>

      <tr>
        <td>最终系数</td>
        <td colspan="2">{{resultDetail.totalCompleteRatio}}%</td>
      </tr>
      </tbody>
    </x-table>
    <!--<div>-->
        <!--<div class="table-title">{{editTitle}}</div>-->
        <!--<div>-->
            <!--<div class="table-row">-->
              <!--<div>我的票数:</div>-->
              <!--<div>{{goodCommentNum+badCommentNum}}</div>-->
            <!--</div>-->
            <!--<div class="table-row">-->
              <!--<div>好评数:</div>-->
              <!--<div>{{goodCommentNum}}</div>-->
            <!--</div>-->
            <!--<div class="table-row">-->
              <!--<div>差评数:</div>-->
              <!--<div>{{badCommentNum}}</div>-->
            <!--</div>-->
            <!--<div class="table-row">-->
              <!--<div>差评说明:</div>-->
              <!--<div>{{badCommentText}}</div>-->
            <!--</div>-->

        <!--</div>-->
    <!--</div>-->
  </div>
</template>
<script>
import { XHeader, Toast, Icon, XTable } from 'vux'

export default {
  name: 'completeCommentResult',
  components: {
    XHeader,
    Icon,
    XTable,
    Toast
  },
  data() {
    return {
      resultDetail: {}, // 结果详情 从localStorage获取的任务列表
      taskList: [] // 从localStorage获取的任务列表
    }
  },
  created() {
    this.getStorage()
  },
  methods: {
    // 获取缓存内容
    getStorage() {
      this.resultDetail = JSON.parse(localStorage.getItem('resultDetail'))
      this.taskList = JSON.parse(localStorage.getItem('taskList'))
      // this.currentName = localStorage.getItem('currentName')
      console.log(this.taskList)
    },
    // 跳转至任务列表
    gotToTaskList() {
      this.$router.push({ name: 'complete' })
    }
  }
}
</script>

<style>
  .completeCommentResult_div {
    text-align: center;
    padding: 10px 0;
    border: 1px solid #eee;
    margin-top: 19px;
    margin-bottom: 21px;
  }
  .table-row {
    display: flex;
    flex-direction: row;
  }
  .table-row div {
    width: 50%;
    padding: 5px 0;
    text-align: center;
    border: 1px solid #eee;
  }
  .completeCommentResult .task{
    width: 200px;
  }
  .completeCommentResult .proportion{
    width: 45px;
  }
  .completeCommentResult .hasDone{
    width: 55px;
  }

  .vux-table td{
    /*width: 90px;*/
  }
  /* 表格下边框 */
  .vux-table td:before,
  .vux-table th:before {
    border-color: #3891f0;
  }
  /* 表格右边框 */
  .vux-table td:after,
  .vux-table th:after {
    border-color: #3891f0;
  }
  /* 表格左边框 */
  .vux-table.vux-table-bordered:before {
    border-color: #3891f0;
  }
  .vux-table:after {
    border-color: #3891f0;
  }
</style>
