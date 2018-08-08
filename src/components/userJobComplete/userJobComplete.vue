<!-- 个人工作完成记录记录 -->
<template>
    <div class="userJobComplete">
      <x-header :right-options="{showMore: true}"
                @on-click-more="showMenus = true">
                个人工作任务
      </x-header>
      <!-- <group> -->
          <!-- <cell v-for="(alist,index) in list" :key="index" :title="alist.taskName" is-link :link="{name:'userJobCompleteResult',params:{id:alist.id}}"></cell> -->
        <x-table full-bordered style="width:90%;margin:20px auto">
          <thead>
            <tr><td colspan="2" style="font-weight:bold;">工作任务</td></tr>
            <tr><td>任务名称</td><td>权重</td></tr>
          </thead>
          <tbody>
            <tr v-for="(alist,index) in list" :key="index">
              <td>{{alist.taskName}}</td>
              <td>{{alist.weights}}%</td>
            </tr>
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
      list: []
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
      //   获取数据
      var userId = '-1006996897483634546'
      var filter = "{'main_annual_work_task':{'user_id':{equalTo:'" + userId + "'}}}"
      request('main_annual_work_tasks', {
        params: {
          filters: filter
        }
      }).then(res => {
        console.log(res)
        this.list = res.data
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