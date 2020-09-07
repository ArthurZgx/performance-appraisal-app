<!-- 个人工作完成记录记录 -->
<template>
    <div class="userJobComplete">
      <x-header :right-options="{showMore: false}"
                @on-click-more="showMenus = true">
                事故等级
      </x-header>
      <div style="padding: 15px;">
        <button-tab v-model="viewTabIndex">
          <button-tab-item>事故等级查看</button-tab-item>
          <button-tab-item>事故惩罚列表</button-tab-item>
        </button-tab>
      </div>
      <div v-if="(noData && viewTabIndex == 0) || (resultEventData.length == 0 && viewTabIndex == 1)" style="text-align: center;color:rgb(109, 109, 109);margin-top: 150px;">没有数据</div>
      <group v-if="viewTabIndex == 0">
        <div class="levelCard" v-for="(title, index) in levelArray" :key="index">
          <div class="levelTitle">{{title}}</div>
          <div v-for="(item, index2) in accidenctObject[title]" :key="index2">
            <div class="levelContent">
              <div class="levelText" v-html="item.content"></div>
              <div class="levelStandard"><span style="color:red;">处罚规定：</span>{{item.standard}}</div>
            </div>
          </div>
        </div>
      </group>
      <div v-if="viewTabIndex == 1">
        <table class="eventLevelPage" v-for="(tableItem, index) in resultEventData" :key="index" border="0" cellspacing="0" cellpadding="0">
          <tbody>
            <tr>
              <td class="bg">事故当事人</td><td>{{tableItem.includes.hm_personnel.name}}</td><td class="bg">事故等级</td><td>{{tableItem.includes.accident_level.level}}</td>
            </tr>
            <tr><td class="bg">生效月份</td><td>{{getDataWithMonth(tableItem.includes.plan_assessment_plan.endTime)}}</td><td class="bg">发生日期</td><td>{{getDataWithMonth(tableItem.superior.occurDate)}}</td></tr>
            <tr><td class="bg">事故内容</td><td :colspan="3">{{tableItem.includes.accident_level.content}}</td></tr>
            <tr><td class="bg">情况描述</td><td :colspan="3">{{tableItem.superior.content}}</td></tr>
            <tr>
              <td :rowspan="2" class="bg">扣除比例</td>
              <td :colspan="2" class="bg">事故等级处罚-直属上级及部门经理</td>
              <td>{{tableItem.includes.accident_level.superiorWeight + '%'}}</td>
            </tr>
            <tr>
              <td :colspan="2" class="bg">事故等级处罚-中心总监</td>
              <td>{{tableItem.includes.accident_level.majordomoWeight + '%'}}</td>
            </tr>
            <tr v-if="!tableItem.superior.affirm && tableItem.superior.partyId == userId">
            <!-- <tr v-if="true"> -->
              <td :colspan="4" style="background: #3891f0;color: white;">
                <a href="#" style="color: white;" @click="confirmEvent(tableItem)">确认</a>
              </td>
            </tr>
            <tr v-else>
              <td>状态</td>
              <td :colspan="3">{{ tableItem.superior.affirm ? '已确认' : '未确认'}}</td>
            </tr>
          </tbody>
        </table>
      </div>  
      <toast v-model="showToast" type="text" :time="800" is-show-mask :text="toastText" position="middle"></toast>
    </div>
</template>
<script>
import { Group, Cell, XHeader, XTable, ButtonTab, ButtonTabItem, Toast } from 'vux'
import request from '../../../src/utils/request.js'
import moment from 'moment'
import _ from 'lodash'
// import _ from 'lodash'
export default {
  data() {
    return {
      levelArray: [],
      accidenctObject: {},
      noData: false,
      resultEventData: [],
      viewTabIndex: 0,
      showToast: false,
      toastText: '确认成功',
      userId: localStorage.getItem('userId')
    }
  },
  components: {
    Group,
    Cell,
    XHeader,
    XTable,
    ButtonTab,
    ButtonTabItem,
    Toast
  },
  methods: {
    // big() {
    //   this.imgWidth = this.imgWidth + 15
    // },
    // small() {
    //   this.imgWidth = this.imgWidth - 15
    // },
    getDatas(departmentId) {
      const self = this
      if (!departmentId) {
        this.noData = true
        return
      }
      request('accident_levels', {
        params: {
          pageNo: 1,
          pageSize: 1000,
          filters: {
            accident_level: {
              userId: {
                equalTo: departmentId
              }
            }
          }
        }
      }).then(res => {
        if (res.data.length === 0) {
          this.noData = true
          return
        }
        const tempArray = self.setAddidenctList(res.data)
        console.debug('输出加入序号的数组', tempArray)
        const tempObject = {}
        tempArray.forEach(value => {
          if (tempObject[value.level]) {
            tempObject[value.level].push(value)
          } else {
            tempObject[value.level] = []
            tempObject[value.level].push(value)
          }
        })
        Object.keys(tempObject).forEach(key => {
          tempObject[key] = _.sortBy(tempObject[key], 'content')
        })
        self.levelArray = Object.keys(tempObject)
        self.accidenctObject = tempObject
        console.debug('排序后的对象', Object.keys(tempObject))
        // this.list = res.data[0]
      }).catch(err => {
        this.msg = err
        this.noData = true
      })
    },
    setAddidenctList(list) {
      const self = this
      let itemNumber = []
      list.forEach(item => {
        itemNumber = item.level.split('级')[0]
        item.levelNum = self.setStringToNumber(itemNumber)
        item.content = item.content.replace(/\n/g, '<br>')
      })
      console.debug(list)
      return _.sortBy(list, 'levelNum')
    },
    setStringToNumber(stringNum) {
      let numLever = 0
      switch (stringNum) {
        case '一':
          numLever = 1
          break
        case '二':
          numLever = 2
          break
        case '三':
          numLever = 3
          break
        case '四':
          numLever = 4
          break
        case '五':
          numLever = 5
          break
      }
      return numLever
    },
    /**
     * 获取已经发生的事故
     */
    getEventDataList() {
      const userId = localStorage.getItem('userId')
      if (!userId) {
        return
      }
      request('accident_punishs', {
        method: 'post',
        data: {
          pageSize: 1000000,
          includes: {
            hm_personnel: { includes: ['party_id'] },
            plan_assessment_plan: { includes: ['plan_assessment_plan_id'] },
            accident_level: { includes: ['accident_level'] }
          }
        }
      }).then(res => {
        // 过滤出符合条件的数据
        let resultEventData = []
        resultEventData = res.data.filter(item => {
          return (item.superior.partyId === userId || item.includes.accident_level.superiorId === userId || item.includes.accident_level.majordomoId === userId)
        })
        let sortResultData = resultEventData.filter(item => {
          return item.superior.affirm === false
        })
        sortResultData = sortResultData.concat(resultEventData.filter(item => {
          return item.superior.affirm === true
        }))
        this.resultEventData = sortResultData
        console.debug(resultEventData)
      })
    },
    /**
     * 格式化日期
     */
    getDataWithMonth(source) {
      return moment(source).format('YYYY-MM-DD')
    },
    /**
     * 确定事故类型
     */
    confirmEvent(row) {
      console.debug(row)
      request('accident_punishs/edit', {
        method: 'post',
        data: {
          id: row.superior.id,
          affirm: true
        }
      })
      .then(res => {
        row.superior.affirm = true
        this.toastText = '确认成功'
        this.showToast = true
      })
      .catch(e => {
        this.toastText = '确认失败'
        this.showToast = true
      })
    }
  },
  mounted() {
    // 获取用户id
    const userId = localStorage.getItem('userId')
    // let departmentId = ''
    this.getDatas(userId)
    this.getEventDataList()
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
.levelCard {
  margin-bottom: 20px;
}
.levelTitle {
  margin: 0 auto;
  width: 94%;
  box-sizing: border-box;
  font-weight: bold;
  font-size: 20px;
  padding: 5px 10px;
  border-bottom: 1px solid #ddd;
}
.levelContent {
  padding: 10px 20px;
  box-sizing: border-box;
}
.levelText {

}
.levelStandard {
  margin-top: 5px;
  /* margin-left: 6px; */
}
.eventLevelPage {
  width: 98%;
  margin: 10px auto;
  border: none;
  border-right:1px solid #3891f0;
  border-bottom:1px solid #3891f0;
}
.eventLevelPage td {
  border: none;
  border-left:1px solid #3891f0;
  border-top:1px solid #3891f0;
  text-align: center;
  padding: 5px;
}
.eventLevelPage .bg {
  /* background: yellow; */
}
.vux-button-group > a.vux-button-group-current {
  background: #5177aa;
}
.vux-button-group > a.vux-button-tab-item-last:after, .vux-button-group > a.vux-button-tab-item-first:after {
  border: 1px solid #5177aa;
}

</style>
