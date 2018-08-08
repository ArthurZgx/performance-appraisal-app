<template>
  <div class="complete">
    <x-header :right-options="{showMore: false}"
              :left-options="{preventGoBack: true}"
              @on-click-back="gotToTaskList"
              @on-click-more="showMenus = true"
              right-options.showMore="false">
      绩效考评
    </x-header>
    <div class="clearfix">
      <search @result-click="resultClick"
              @on-change="searchChange"
              :results="results"
              v-model="searchValue"
              position="absolute"
              auto-scroll-to-top
              cancel-text="取消"
              top="46px"
              @on-focus="searchFocus"
              @on-cancel="searchCancel"
              @on-submit="searchSubmit"
              @on-clear="searchClear"
              ref="search">
      </search>
    </div>
    <group class="home_group groupList">
      <scroller lock-x @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offset="1700">
      <div>
      <div class="aGroupList" v-for="(item,index) in completeList" :key="index">
        <div class="completeClassifyTitle">{{item.department}}</div>
        <div>
          <div v-for="(list,index) in item.list" :key="index" class="aListData">
            <div class="listInfo" @click="goTocompleteComment(list)">
              <div class="listInfoName">{{list.title}}</div>
              <div class="listInfoTime">{{list.time}}</div>
            </div>
          </div>
        </div>
      </div>
      </div>
      <load-more tip="loading" v-show="showScrollerLoading"></load-more>
      </scroller>
    </group>
    <!-- 一键提交 -->
    <!--<sticky ref="sticky"-->
            <!--:offset="100"-->
            <!--:check-sticky-support="false"-->
            <!--disabled="disabled">-->
      <!--<flexbox style="background:white;">-->
        <!--<flexbox-item :span="3.5">-->
          <!--<div @click="clickAll" class="home_div">-->
            <!--<span @click="checkedAll = !checkedAll" :class="checkedAll?'my-check-icon-clicked':'my-check-icon'"></span>全选-->
          <!--</div>-->
        <!--</flexbox-item>-->
        <!--<flexbox-item>-->
          <!--<x-button style="background:#3891f0;color:white;" @click.native="checklist1.length > 0?showSubmitDialog = true:showSubmitErrorToast = true">一键提交</x-button>-->
        <!--</flexbox-item>-->
      <!--</flexbox>-->
    <!--</sticky>-->
    <!-- 弹出框 -->
    <div>
      <x-dialog v-model="showSubmitDialog" class="dialog-demo">
        <span class="img-box">
          <img src="http://ui.haomo-tech.com/%E9%93%B6%E4%BF%A1%E9%95%BF%E8%BF%9C/assets/Path%20.png" alt="">
        </span>
        <div class="box-title">
          确认使用一键提交说所有人的评价吗</div>
        <div class="bottomBtn">
          <span class="vux-cancel" @click="showSubmitDialog=false">取消</span>
          <span class="vux-sure" @click="affirmSubmit">确认</span>
        </div>
      </x-dialog>
    </div>
    <toast v-model="showSubmitErrorToast" type="text" :time="800" is-show-mask text="没有选中数据" position="bottom">没有选中数据</toast>
    <toast v-model="showSubmitToast" type="text" :time="800" is-show-mask text="提交成功" position="bottom">提交成功</toast>
  </div>
</template>

<script>
  import { Group, Cell, Tabbar, TabbarItem, XHeader, Icon, Search, CheckIcon, XButton, Flexbox, FlexboxItem, Sticky, XDialog, Toast, Scroller, LoadMore } from 'vux'
  import _ from 'lodash'
  import request from '@/utils/request'
  // import { compare } from '@/utils'

  export default {
    name: 'complete',
    components: {
      Group,
      Cell,
      Tabbar,
      XHeader,
      TabbarItem,
      Icon,
      Search,
      CheckIcon,
      XButton,
      Flexbox,
      Sticky,
      FlexboxItem,
      XDialog,
      Toast,
      Scroller,
      LoadMore
    },
    data() {
      return {
        results: [], // 搜索结果列表
        searchValue: '', // 搜索绑定的数据
        checklist1: [], // 选择列表
        commonList: ['name1', 'name2', 'name3', 'name4'], // 所有供选择的列表
        checkedAll: false, // 是否全选
        childNodeNum: 0,
        showSubmitDialog: false,
        showSubmitToast: false,
        showSubmitErrorToast: false,
        completeList: [], // 数据列表
        completeList2: [], // 数据列表
        showScrollerLoading: false, // 修改第一处 改为true
        pageNo: 1,
        onFacting: false
      }
    },
    created() {
      // this.getTotalLength()
      this.getDetailId() // 获取数据
    },
    watch: {
      // checkedAll(newValue, oldValue) {
      //   console.log('改变了', '旧', oldValue)
      //   console.log('改变了', '新', newValue)
      // }
    },
    methods: {
      // 获取总评价数量
      // getTotalLength() {
      //   for (i = 0; i < this.completeList.length; i++) {
      //     for (j = 0, len = this.completeList[i].list.length; j < len; j++) {
      //       this.childNodeNum++
      //     }
      //   }
      // },
      onScrollBottom() {
        // 滑动触底  // 修改第二处 取消注释
        // if (this.completeList.length >= 1) {
        //   if (!this.onFacting) {
        //     console.log('运行了')
        //     this.pageNo = this.pageNo + 1
        //     this.onFacting = true
        //     setTimeout(() => {
        //       this.getDetailId()
        //       this.onFacting = false
        //     }, 1000)
        //   }
        // }
      },
      // 跳转至home
      gotToTaskList() {
        this.$router.push({ name: 'home' })
      },
      // 获取所有工作任务明细表数据
      getDetailId() {
        const self = this
        console.log('获取缓存', localStorage.getItem('userId'))
        const userId = localStorage.getItem('userId')
        // 过滤条件 评价人为当前用户 状态为0
        const filters1 = {
          'main_job_detail': {
            'user_id': { equalTo: userId }, 'status': { equalTo: '0' }
          }
        }
        // 请求任务明细表中评价人为当前用户并且status=0的数据
        request('main_job_details', {
          params: { filters: filters1, pageNo: 1, pageSize: 10000 }
        }).then(res => {
          console.log('工作任务明细表', res.data)
          const resAll = res.data
          let detailIds = []
          if (resAll.length) {
            _.each(resAll, function(item, key) {
              detailIds.push(item.mainJobServiceEvaluationId)
            })
            // 根据主表id去重
            detailIds = _.uniq(detailIds)
            console.log('去重后', detailIds)
            // 根据去重后的主表ID过滤出所有主表带用户表数据
            self.getMainData(detailIds)
          }
        })
      },
      getMainData(detailIds) {
        if (detailIds.length === 0) return
        const self = this
        // 用明细表中的字段过滤主表带用户表
        const filters2 = {
          'main_job_service_evaluation': {
            'id': { in: detailIds }
          }
        }
        request('main_job_service_evaluations', {
          params: {
            filters: filters2,
            pageNo: 1, // 修改第三处 self.pageNo 下面 pageSize=10
            pageSize: 10000,
            includes: {
              'hm_personnel': { includes: ['user_id'] }}
          }
        }).then(res2 => {
          console.log('主表+用户表', res2.data)
          const res2All = res2.data
          const tempArray = []
          if (res2All.length) {
            // 遍历主表和用户表数据
            _.each(res2All, function(item, key) {
              const temp = { department: '', list: [] }
              temp.department = item.includes.hm_personnel.departmentName
              item.superior.time = item.superior.createTime.split(' ')[0]
              item.superior.userName = item.includes.hm_personnel.name
              temp.list.push(item.superior)
              tempArray.push(temp)
            })
            if (tempArray.length <= 1) {
              // self.showScrollerLoading = false  // 修改第四处 取消注释 并且 tempArray.length < 10
            }
            // self.completeList2 = self.completeList2.concat(tempArray) 修改第五处 取消注释 下一行参数改为self.completeList2
            self.dealData(tempArray)
            console.log('tempArray', tempArray)
          }
        })
      },
      // 对数据处理 按部门分 按首字母排序
      dealData(tempArray) {
        const self = this
        let list = []
        // 先获取所有的部门
        _.each(tempArray, function(item, key) {
          const temp = { department: item.department, list: [] }
          list.push(temp)
        })
        // 部门去重
        list = _.uniqWith(list, _.isEqual)
        console.log(236, tempArray)
        // 部门分组
        _.each(tempArray, function(item, key) {
          const curItem1 = item.department
          _.each(list, function(item2, key2) {
            const curItem2 = item2.department
            if (curItem1 === curItem2) {
              item2.list.push(item.list[0])
            }
          })
        })
        // 人名排序
        _.each(list, function(item, key) {
          item.list.sort(function(p1, p2) {
            return p1.title.localeCompare(p2.title)
          })
        })
        // 部门排序
        list.sort(function(p1, p2) {
          return p1.department.localeCompare(p2.department)
        })
        self.completeList = list
      },
      searchFocus() {},
      searchCancel() {
        console.log('cancel')
      },
      searchClear() {
        this.getDetailId()
      },
      resultClick() {},
      searchSubmit(val) {
        const self = this
        const searchName = val.trim()
        const completeList = self.completeList
        if (searchName === '') {
          self.getDetailId()
          return null
        }
        self.completeList = completeList.filter(item => {
          console.log('completeList', item)
          if (item.list && item.list.length) {
            item.list = item.list.filter(it => {
              if (it.title.includes(searchName)) {
                return true
              }
            })
            if (item.list.length) {
              return true
            }
          }
        })
      },
      searchChange(val) {
        const self = this
        const searchName = val.trim()
        if (searchName === '') {
          self.getDetailId()
        }
      },
      clickList() {},
      // 跳转评价详情
      goTocompleteComment(list) {
        localStorage.setItem('currentTask', JSON.stringify(list))
        console.log('list', list)
        this.$router.push({ name: 'completeComment' })
      },
      // 选中当前数据
      // listCheckClick(list) {
      //   list.checked = !list.checked
      //   this.checkedAll = false
      //   if (list.checked === true) {
      //     this.checklist1.push(list)
      //     if (this.checklist1.length === this.childNodeNum) {
      //       this.checkedAll = true
      //     }
      //     return false
      //   }
      //   if (list.checked === false) {
      //     for (i = 0, len = this.checklist1.length; i < len; i++) {
      //       if (this.checklist1[i].name === list.name) {
      //         console.log(this.checklist1[i])
      //         this.checklist1.splice(i, 1)
      //         console.log(i)
      //       }
      //     }
      //   }
      // },
      affirmSubmit() {
        this.showSubmitDialog = false
        this.showSubmitToast = true
      },
      // 全选
      checkAll() {
        // this.checklist1 = []
      }
      // 点击全选
      // clickAll() {
      //   console.log('点击全选')
      //   // const all = _.without.appy(_, [this.commonList].concat(this.checklist1))
      //   // this.checklist1 = all
      //   // if (this.checklist1.length ==== 4) {
      //   //   this.checklist1 = []
      //   // } else {
      //   //   this.checklist1 = this.commonList
      //   // }
      //   if (this.checkedAll === false) {
      //     this.checkAll = true
      //     for (j = 0; j < this.completeList.length; j++) {
      //       for (i = 0, len = this.completeList[j].list.length; i < len; i++) {
      //         this.completeList[j].list[i].checked = false
      //       }
      //     }
      //     this.checklist1.splice(0, this.checklist1.length)
      //   } else if (this.checkedAll === true) {
      //     this.checklist1.splice(0, this.checklist1.length)
      //     this.checkAll = false
      //     for (j = 0; j < this.completeList.length; j++) {
      //       for (i = 0, len = this.completeList[j].list.length; i < len; i++) {
      //         this.completeList[j].list[i].checked = true
      //         this.checklist1.push(this.completeList[j].list[i])
      //       }
      //     }
      //   }
      // }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.weui-search-bar__cancel-btn {
  display: block;
}
.complete .vux-sticky-box {
  position: fixed;
  width: 100%;
  bottom: 0;
}
.groupList {
  /*padding-bottom: 50px;*/
  padding: 0 10px;
}
.aListData {
  display: flex;
  flex-direction: row;
  padding: 10px 0;
}
.completeClassifyTitle {
  padding: 10px 5px;
  border-bottom: 1px solid #eee;
  color: #666;
  font-size: 14px;
}
.listCheck {
  height: 50px;
  line-height: 50px;
}
.listInfo {
  height: 50px;
  margin-left: 10px;
  line-height: 25px;
}
.listInfoName {
  font-size: 16px;
  color: #333;
}
.listInfoTime {
  font-size: 13px;
  color: #888;
}
.aListData {
  border-bottom: 1px solid #eee;
}

.weui-dialog {
  border-radius: 8px;
  padding-bottom: 8px;
  height: 150px;
  max-width: 400px;
}
.dialog-title {
  color: #666;
}
.img-box {
  overflow: hidden;
}
.vux-close {
  margin-top: 8px;
  margin-bottom: 8px;
}
.img-box {
  float: left;
  background: #e11c1c;
  display: block;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  margin-left: 20px;
  margin-top: 20px;
}
.img-box img {
  height: 50%;
  margin-top: 11px;
}
.box-title {
  line-height: 20px;
  margin-top: 20px;
  text-align: left;
  margin-left: 90px;
  margin-right: 20px;
}
.vux-sure {
  color: #e11c1c;
  margin-left: 20px;
}
.bottomBtn {
  position: absolute;
  bottom: 7px;
  right: 10px;
}
.my-check-icon {
  display: inline-block;
  width: 15px;
  height: 15px;
  background: white;
  position: relative;
  margin-left: 20px;
  border: 1px solid #c7c7c7;
  margin-right: 10px;
  margin-top: 15px;
}
.my-check-icon-clicked {
  display: inline-block;
  width: 15px;
  height: 15px;
  margin-top: 15px;
  background: #3891f0;
  border: 1px solid #3891f0;
  position: relative;
  margin-left: 20px;
  margin-right: 10px;
}
.my-check-icon-clicked::after {
  content: '\00a0';
  display: inline-block;
  border: 2px solid #fff;
  border-top-width: 0;
  border-right-width: 0;
  width: 10px;
  height: 5px;
  -webkit-transform: rotate(-50deg);
  position: absolute;
  top: 2px;
  left: 1px;
}
.clearfix {
   *zoom: 1;
   height: 44px;
}
</style>
