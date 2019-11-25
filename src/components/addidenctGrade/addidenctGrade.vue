<!-- 个人工作完成记录记录 -->
<template>
    <div class="userJobComplete">
      <x-header :right-options="{showMore: false}"
                @on-click-more="showMenus = true">
                事故等级
      </x-header>
      <div v-if="noData" style="text-align: center;margin-top: 150px;color:rgb(109, 109, 109);">没有数据</div>
      <group>
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
      </div>
</template>
<script>
import { Group, Cell, XHeader, XTable } from 'vux'
import request from '../../../src/utils/request.js'
import _ from 'lodash'
// import _ from 'lodash'
export default {
  data() {
    return {
      levelArray: [],
      accidenctObject: {},
      noData: false
    }
  },
  components: {
    Group,
    Cell,
    XHeader,
    XTable
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
      request('accident_levels', {
        params: {
          pageNo: 1,
          pageSize: 1000,
          filters: {
            accident_level: {
              departmentId: {
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
    }
  },
  mounted() {
    // 获取用户id
    const userId = localStorage.getItem('userId')
    let departmentId = ''
    request('hm_personnels', {
      params: {
        filters: {
          hm_personnel: {
            id: {
              equalTo: userId
            }
          }
        }
      }
    }).then(resp => {
      if (resp.data.length === 0) {
        this.noData = true
      } else {
        departmentId = resp.data[0].postId
        this.getDatas(departmentId)
      }
      console.debug('输出测试', resp)
    }).catch(() => {
      this.noData = true
    })
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
  margin-top: 20px;
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
</style>
