<!-- 个人工作完成记录记录 -->
<template>
    <div class="userJobComplete">
      <x-header :right-options="{showMore: false}"
                @on-click-more="showMenus = true">
                我的工作任务
      </x-header>
      <!-- <group> -->
          <!-- <cell v-for="(alist,index) in list" :key="index" :title="alist.taskName" is-link :link="{name:'userJobCompleteResult',params:{id:alist.id}}"></cell> -->
        <!--<x-table full-bordered style="width:90%;margin:20px auto">-->
          <!--<thead>-->
            <!--<tr><td colspan="2" style="font-weight:bold;">工作任务</td></tr>-->
            <!--<tr><td style="width:50px;">序号</td>-->
            <!--<td style="min-width:100px;">任务内容</td></tr>-->
          <!--</thead>-->
          <!--<tbody>-->
            <!--<tr v-for="(alist,index) in list" :key="index">-->
              <!--<td>{{index + 1}}</td>-->
              <!--<td>-->
                <!--<tr>{{alist.planContent}}</tr>-->
                <!--<tr>-->
                  <!--<td>完成时间：{{alist.extend1}}</td>-->
                  <!--<td>权重：{{alist.extend2}}</td>-->
                <!--</tr>-->
               <!--</td>-->
            <!--</tr>-->
            <!--<tr><td colspan="2" v-if="list.length == '0'">暂无数据</td></tr>-->
          <!--</tbody>-->
        <!--</x-table>-->
      <!-- </group> -->
      <div class="noDataTip" v-if="list.length == 0">暂无工作任务</div>
      <div class="personalTaskList" v-if="list.length != 0">
        <div class="oneTask" v-for="(alist,index) in list" >
          <div class="taskIndex">
            {{index + 1}}
          </div>
          <div class="taskInfo">
            <div class="taskName">{{alist.planContent}}</div>
            <div class="taskXj"><div class="finishTaskTime">完成时间：{{alist.extend1}}</div><div class="taskWeight">权重：{{alist.weights}}%</div></div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { Group, Cell, XHeader, XTable } from 'vux'
import request from '../../../src/utils/request.js'
// import _ from 'lodash'
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
      // if (this.month < 10) {
      //   this.month = '0' + this.month
      // }
      // console.log(month)
      const time = `${year}${month}00`
      const time2 = `${year}${month}32`
      //   获取数据
      const userId = localStorage.getItem('userId')
      if (userId === null) {
        return false
      }
      // const filter = { 'main_job_detail': {
      //   'hmPersonnelId': { equalTo: userId },
      //   'year': { equalTo: year },
      //   'month': { equalTo: month }}}
      // request('main_job_details', {
      //   params: {
      //     sortItem: 'create_time',
      //     filters: filter,
      //     pageNo: 1,
      //     pageSize: 1000
      //   }
      // })
      const filter = { 'main_annual_work_task': {
        'user_id': { equalTo: userId }}}
      request('main_annual_work_tasks', {
        params: {
          sortItem: 'create_time',
          filters: filter,
          pageNo: 1,
          pageSize: 1000
        }
      }).then(res => {
        this.list = res.data
        this.list.forEach(item => {
          if (item.extend1) {
            item.extendTemp = item.extend1.replace(/\./g, '').replace('/\-/g', '')
          }
        })
        this.list = this.list.filter(item => {
          // console.log('输出', time, time2)
          return item.extendTemp > time && item.extendTemp < time2
        })
        // this.list = _.uniqBy(this.list, 'mainAnnualWorkTaskId')
        this.msg = '接受数据' + res.data.length
        // console.log(this.list)
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
.personalTaskList {
  margin-top: 40px;
}
.oneTask {
  display: flex;
  flex-direction: row;
  align-items: center;
  border: 1px solid #eee;
  width: 94%;
  margin: 10px auto;
  /*box-shadow: 0 2px 4px 2px rgba(0,0,0,0.10);*/
  padding: 8px 15px;
  box-sizing: border-box;
}
.taskIndex {
  /*width: 150px;*/
  padding: 0 15px;
  text-align: center;
}
.taskName {
  font-weight: bold;
  color: #333333;
}
.taskInfo {
  width: 100%;
}
.taskXj {
  /*display: flex;*/
  /*flex-direction: row;*/
  width: 100%;
  color: #666;
}
.finishTaskTime{
  /*width: 200px;*/
  float: left;
}
.taskWeight {
  float: right;
}
/*@media screen and (max-width: 350px) {*/
  /*.finishTaskTime{*/
    /*width: 172px;*/
  /*}*/
/*}*/
.noDataTip {
  width: 100%;
  text-align: center;
  margin-top: 150px;
  color: #666;
}
</style>
