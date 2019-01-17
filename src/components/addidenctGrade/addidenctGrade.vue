<!-- 个人工作完成记录记录 -->
<template>
    <div class="userJobComplete">
      <x-header :right-options="{showMore: false}"
                @on-click-more="showMenus = true">
                事故等级
      </x-header>
      <div style="overflow-x:scroll;">
          <img :style="{width:imgWidth + '%'}" :src="'http://kaoping.trustfar.cn' + list.level" />
      </div>
      <div style="position:fixed;bottom:0;left:0;background:#5177aa;height:50px;width:100%;">
          <div style="color:white;float:left;width:50%;text-align:center;line-height:50px;border-right:1px solid #335599;box-sizing:boder-box;font-size:25px;" @click="big">放大</div>
          <div style="color:white;float:right;width:49%;text-align:center;line-height:50px;font-size:25px;" @click="small">缩小</div>
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
      msg: '没有数据',
      imgWidth: 100
    }
  },
  components: {
    Group,
    Cell,
    XHeader,
    XTable
  },
  methods: {
    big() {
      this.imgWidth = this.imgWidth + 15
    },
    small() {
      this.imgWidth = this.imgWidth - 15
    },
    getDatas() {
      request('accident_levels', {
        params: {
          pageNo: 1,
          pageSize: 1000
        }
      }).then(res => {
        this.list = res.data[0]
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
