<template>
  <div>
    <div class="vux-demo">
      <x-header :right-options="{showMore: false}"
                @on-click-more="showMenus = true"
                right-options.showMore="false">
        绩效考评
      </x-header>
      <!-- <img class="logo" src="../../assets/vux_logo.png">
      <h3>考评记录</h3> -->

    </div>
    <!-- <group>
      <cell title="返回首页" value="cool" is-link link="/personal"></cell>
    </group> -->
    <!-- <form-preview :header-label="('张三03月服务质量评价')"  :body-items="list" ></form-preview> -->
      <div style="text-align:center;margin-bottom:10px;font-weight:bold;color:#333;margin-top:20px;">{{name}}</div>

      <span v-if="$route.params.type === 1">
      <!-- 服务质量显示表格 -->
    <x-table full-bordered style="background-color:#fff;width:90%;margin: 20px auto;color:#333;">
      <tbody>
      <tr v-for="(item,index) in list" :key="index">
        <td style="width:30%;">{{item.label}}</td>
        <td>{{item.value}}</td>
      </tr>
      </tbody>
    </x-table>

      </span>

      <span v-else-if="$route.params.type === 0">

      <!-- 工作完成度显示表格 -->
    <x-table full-bordered style="background-color:#fff;width:90%;margin: 20px auto;color:#333;">
      <thead>
        <tr>
          <td>任务</td>
          <td style="width:59px;">权重</td>
          <td style="width:59px;">实际完成度</td>
        </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in jobCompleteList" :key="index">
        <td>{{item.superior.taskName}}</td>
        <td style="width:59px;">{{item.superior.weights}}%</td>
        <td style="width:59px;">{{item.superior.completionRatio}}%</td>
      </tr>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="2">最终系数</td>
          <td>{{result}}%</td>
        </tr>
      </tfoot>
    </x-table>
      </span>
   </div>
</template>
<script>
  import { FormPreview, XHeader, Icon, Group, Cell, XTable } from 'vux'
  import request from '../../../src/utils/request.js'
  export default {
    name: 'personal',
    components: {
      FormPreview,
      XHeader,
      Icon,
      Group,
      Cell,
      XTable
    },
    data() {
      return {
        name: '',
        msg: 'Welcome to Your Vue.js App',
        list: [{
          label: '我的票数',
          value: '0'
        }, {
          label: '好评论数',
          value: '0'
        }, {
          label: '差评数',
          value: '0'
        }, {
          label: '差评说明',
          value: ''
        }],
        jobCompleteList: [{
          superior: {
            scopedSlots: 0
          }}],
        userId: 0,
        result: 0
      }
    },
    mounted() {
      this.userId = localStorage.getItem('userId')
      if (this.$route.params.type === 0) { // 如果是工作完成度
        this.getCompleteData()
      } else if (this.$route.params.type === 1) { // 如果是服务质量
        this.getServiceData()
      }
    },
    methods: {
      // 获取服务质量信息
      getServiceData() {
        if (this.$route.params.id !== undefined) {
          // console.log(this.$route.params.id)
          var filter = "{'main_service_detail':{'id':{equalTo:'" + this.$route.params.cid + "'},'user_id':{equalTo:'" + this.userId + "'}}}"
          var includes = "{'main_job_service_evaluation':{includes:['main_job_service_evaluation_id']}}"
          request('main_service_details', {
            params: { filters: filter, includes }
          }).then(res => {
            this.list[0].value = res.data[0].superior.numberVotes
            this.list[1].value = res.data[0].superior.praiseNumber
            this.list[2].value = res.data[0].superior.badNumber
            this.list[3].value = res.data[0].superior.badReview
            this.name = res.data[0].includes.main_job_service_evaluation.title
          })
        }
      },
      // 获取工作完成度信息
      getCompleteData() {
        if (this.$route.params.id !== undefined) {
          // console.log(this.$route.params.id)
          var filter = "{'main_job_detail':{'main_job_service_evaluation_id':{equalTo:'" + this.$route.params.id + "'},'user_id':{equalTo:'" + this.userId + "'}}}"
          var includes = "{'main_job_service_evaluation':{includes:['main_job_service_evaluation_id']}}"
          request('main_job_details', {
            params: { filters: filter, includes }
          }).then(res => {
            this.jobCompleteList = res.data
            var result = 0
            for (var i = 0, len = res.data.length; i < len; i++) {
              result = result + (this.jobCompleteList[i].superior.weights * this.jobCompleteList[i].superior.completionRatio) / 100
            }
            this.result = Math.floor(result * 1000) / 1000
          })
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
  border-bottom: 1px dashed #f11;
}
a {
  color: #42b983;
}
td {
  padding: 0 5px;
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
