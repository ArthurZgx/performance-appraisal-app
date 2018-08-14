<!-- 个人工作完成记录记录 -->
<template>
    <div class="userJobComplete">
      <x-header :right-options="{showMore: false}"
                @on-click-more="showMenus = true">
                我的工作任务
      </x-header>
      <!-- <group> -->
          <!-- <cell v-for="(alist,index) in list" :key="index" :title="alist.taskName" is-link :link="{name:'userJobCompleteResult',params:{id:alist.id}}"></cell> -->
        <x-table full-bordered style="width:90%;margin:20px auto">
          <thead>
            <tr><td colspan="2" style="font-weight:bold;">工作任务</td></tr>
            <tr><td style="min-width:100px;">任务名称</td><td style="min-width:100px;">任务内容</td></tr>
          </thead>
          <tbody>
            <tr v-for="(alist,index) in list" :key="index">
              <td>{{alist.taskName}}</td>
              <td>{{alist.planContent}}</td>
            </tr>
            <tr><td colspan="2" v-if="list.length == '0'">暂无数据</td></tr>
          </tbody>
        </x-table>
      <!-- </group> -->
    </div>
</template>

<script>
import { Group, Cell, XHeader, XTable } from 'vux'
import request from '../../../src/utils/request.js'
export default {
  data() {
    return {
      list: [],
      msg: '没有数据'
    }
  },
  components: {
    Group,
    Cell,
    XHeader,
    XTable
  },
  methods: {
    getDatas() {
      const date = new Date()
      const year = date.getFullYear()
      const month = date.getMonth() + 1
      if (this.month < 10) {
        this.month = '0' + this.month
      }
      console.log(month)
      //   获取数据
      const userId = localStorage.getItem('userId')
      if (userId === null) {
        return false
      }
      const filter = "{'main_job_detail':{'hmPersonnelId':{equalTo:'" + userId + "'},'year':{equalTo:'" + year + "'},'month':{equalTo:'" + month + "'}}}"
      request('main_job_details', {
        params: {
          filters: filter
        }
      }).then(res => {
        this.list = res.data
        this.msg = '接受数据' + res.data.length
        console.log(this.list)
      }).catch(err => {
        this.msg = err
      })
    }

  },
  mounted() {
    this.getDatas()
  }
}
</script>

<style scoped>
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
