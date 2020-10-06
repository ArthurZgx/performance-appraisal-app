<template>
  <div>
    <div class="vux-demo">
      <x-header :right-options="{showMore: false}"
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
        <th style="min-width:66px;">考评周期</th>
        <th style="width:79px;">服务质量评价系数</th>
        <th>工作完成度评价系数</th>
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
        <td>{{result.serviceCoefficient}}</td>
        <td>{{result.workCoefficient}}</td>
        <td>{{result.cardCoefficient}}</td>
        <td>{{result.endCoefficient}}</td>
      </tr>
      </tbody>
    </x-table>
    <!-- <flexbox align="flex-start" style="wdith:90%;border:1px solid blue;">
      <flexbox-item style="max-width:47px;">考评周期</flexbox-item>
      <flexbox-item>服务质量评价系数</flexbox-item>
      <flexbox-item style="min-width:81px;">工作完成度评价系数</flexbox-item>
      <flexbox-item style="max-width:47px;">考勤系数</flexbox-item>
      <flexbox-item style="max-width:47px;">最终系数</flexbox-item>
    </flexbox>
    <flexbox align="flex-start" style="wdith:90%;border:1px solid blue;" v-for="(result,index) in resultList" :key="index">
      <flexbox-item style="max-width:47px;">{{result.period}}</flexbox-item>
      <flexbox-item>{{result.serviceCoefficient}}%</flexbox-item>
      <flexbox-item style="min-width:81px;">工作完成度评价系数</flexbox-item>
      <flexbox-item style="max-width:47px;">考勤系数</flexbox-item>
      <flexbox-item style="max-width:47px;">最终系数</flexbox-item>
    </flexbox> -->
    <div class="confirmEvaluaionResult" @click="confirmEvaluaionResult" v-if="isSure">
      确认考评结果
    </div>
    <toast v-model="showToast" type="text" :time="800" is-show-mask position="bottom">{{msg}}</toast>
    </div>
</template>

<script>
  import { Group, Cell, XHeader, XTable, LoadMore, Flexbox, FlexboxItem, Toast } from 'vux'
  import _ from 'lodash'
  import moment from 'moment'
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
      FlexboxItem,
      Toast
    },
    data() {
      return {
        msg: '确认成功',
        resultList: [], // 结果列表
        year: 0,
        month: 0,
        isSure: false,
        notSureIds: [],
        showToast: false
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
        if (!userId) {
          return
        }
        const params = {
          sortItem: 'create_time',
          sortOrder: 'desc',
          filters: {
            main_job_service_evaluation_result: {
              user_id: { equalTo: userId }
            }
          }
        }
        request('main_job_service_evaluation_results', {
          params: params
        }).then(res => {
          // console.log(106, res)
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
              if (item.isSure === 0 || item.isSure === null) {
                if (moment(new Date()).format('YYYYMMDDHHmmss') - moment(item.createTime).format('YYYYMMDDHHmmss') < 3000000) {
                  that.isSure = true
                  that.notSureIds.push(item.id)
                }
              }
            })
            // console.log('isSure', that.notSureIds)
          }
        })
      },
      confirmEvaluaionResult() {
        const params = {
          isSure: 1
        }
        const q = []
        _.each(this.notSureIds, item => {
          q.push(new Promise((resolve, reject) => {
            request('main_job_service_evaluation_results/' + item + '/edit', {
              params: params,
              method: 'POST',
              headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                'X-Auth-Token': '7235ba9e71f7493d9d56b29401d9f47c',
                'LoginType': 'app'
              }
            }).then(res => {
              resolve('success')
            }).catch(err => {
              console.log(err)
              resolve('error')
            })
          }))
        })
        Promise.all(q).then(res => {
          let errNum = 0
          let successNum = 0
          _.each(res, item => {
            if (item === 'success') {
              successNum++
            } else if (item === 'error') {
              errNum++
            }
          })
          if (successNum === res.length) {
            // console.log('全部成功')
            this.msg = '提交成功'
            this.showToast = true
            this.isSure = false
          } else {
            console.log('失败了', errNum)
            this.msg = '提交失败'
            this.showToast = true
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
.confirmEvaluaionResult{
  margin: 100px auto;
  padding: 10px 0;
  text-align: center;
  width: 99%;
  border:1px solid #3891f0;
  box-sizing: border-box;
}
.confirmEvaluaionResult:hover{
  background: #3891f0;
  color: white;
}
</style>
