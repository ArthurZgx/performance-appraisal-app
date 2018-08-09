<template>
  <div>
    <div class="vux-demo">
      <x-header :right-options="{showMore: false}"
                style="box-shadow: 0 2px 10px 0 rgba(0,0,0,0.10);margin-bottom: 15px;"
                @on-click-more="showMenus = true">
                考评结果
      </x-header>
      <!--<img class="logo" src="../../assets/vux_logo.png">-->
      <!--<h3>考评结果</h3>-->
    </div>
    <!--<group title="cell demo">-->
      <!--<cell title="返回首页" value="cool" is-link link="/personal"></cell>-->
    <!--</group>-->
    <!-- <load-more tip="" :show-loading="false" background-color="#fbf9fe"></load-more> -->
    <div class="table-title">我的考评结果</div>
    <x-table full-bordered style="margin:0 auto;width:90%;">
      <thead>
      <tr>
        <th style="max-width:47px;">考评周期</th>
        <th style="max-width:79px;">服务质量评价系数</th>
        <th style="max-width:88px;">工作完成度评价系数</th>
        <th style="max-width:47px;">考勤系数</th>
        <th style="max-width:47px;">最终系数</th>
      </tr>
      </thead>
      <tbody>
      <tr v-if="!resultList.length">
        <td colspan="5" height="60px">暂无数据</td>
      </tr>
      <tr v-for="(result,index) in resultList" :key="index">
        <td>{{result.period}}</td>
        <td>{{result.serviceCoefficient}}%</td>
        <td>{{result.workCoefficient}}%</td>
        <td>{{result.cardCoefficient}}%</td>
        <td>{{result.endCoefficient}}%</td>
      </tr>
      <!--<tr>-->
        <!--<td>2018.06</td>-->
        <!--<td>90%</td>-->
        <!--<td>90%</td>-->
        <!--<td>90%</td>-->
        <!--<td>72.9%</td>-->
      <!--</tr>-->
      <!--<tr>-->
        <!--<td>2018.06</td>-->
        <!--<td>90%</td>-->
        <!--<td>90%</td>-->
        <!--<td>90%</td>-->
        <!--<td>72.9%</td>-->
      <!--</tr>-->
      <!--<tr>-->
        <!--<td>2018.06</td>-->
        <!--<td>90%</td>-->
        <!--<td>90%</td>-->
        <!--<td>90%</td>-->
        <!--<td>72.9%</td>-->
      <!--</tr>-->
      <!--<tr>-->
        <!--<td>2018.06</td>-->
        <!--<td>90%</td>-->
        <!--<td>90%</td>-->
        <!--<td>90%</td>-->
        <!--<td>72.9%</td>-->
      <!--</tr>-->
      <!--<tr>-->
        <!--<td>2018.06</td>-->
        <!--<td>90%</td>-->
        <!--<td>90%</td>-->
        <!--<td>90%</td>-->
        <!--<td>72.9%</td>-->
      <!--</tr>-->
      </tbody>
    </x-table>

  </div>
</template>

<script>
  import { Group, Cell, XHeader, XTable, LoadMore, Flexbox, FlexboxItem } from 'vux'
  import _ from 'lodash'
  import request from '@/utils/request'

  export default {
    name: 'Demo',
    components: {
      Group,
      Cell,
      XHeader,
      XTable,
      LoadMore,
      Flexbox,
      FlexboxItem
    },
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        resultList: [], // 结果列表
        year: 0,
        month: 0
      }
    },
    created() {
      this.getEvaluations()
      var date = new Date()
      this.year = date.getFullYear()
      this.month = date.getMonth() + 1
      if (this.month < 10) {
        this.month = '0' + this.month
      }
    },
    methods: {
      getEvaluations() {
        const self = this
        // 获取当前用户考评结果
        const userId = localStorage.getItem('userId')
        const params = {
          filters: {
            main_job_service_evaluation_result: {
              user_id: { equalTo: userId }
            }
          }
        }
        request('main_job_service_evaluation_results', {
          params: params
        }).then(res => {
          console.log(106, res)
          if (res.data.length) {
            self.resultList = res.data
            // 增加考评周期字段
            var that = this
            _.each(self.resultList, function(item, key) {
              if ((item.year === that.year && item.month <= that.month) || (item.year === that.year - 1 && item.month >= that.month)) {
                // 处理月份位数 1--> 01
                item.month = item.month + ''
                item.month = item.month.length > 1 ? item.month : '0' + item.month
                item.period = item.year + '.' + item.month
              } else {
                self.resultList.splice(key, 1)
              }
              console.log(key)
            })
          }
        })
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
}
a {
  color: #42b983;
}
.table-title {
  font-weight: bold;
  text-align: center;
  padding: 10px 0;
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
