<template>
  <div class="serve">
    <x-header :right-options="{showMore: false}"
              @on-click-more="showMenus = true">
      绩效考评
    </x-header>
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
            ref="search">
    </search>
    <!-- v-if="list.status === '2'"-->
    <group class="home_group groupList">
      <scroller lock-x @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offset="40" height="-145">
      <div>
      <div class="aGroupList" v-for="(item,index) in serveList" :key="index">
        <div class="serveClassifyTitle">{{item.title}}</div>
        <div>
           <div v-for="(list,index) in item.list" :key="index" class="aListData">
            <div>
              <!-- <check-icon :value.sync="list.checked"></check-icon> -->
              <!-- 勾选按钮 -->
              <span @click="listCheckClick(list)" :class="list.checked?'my-check-icon-clicked':'my-check-icon'"></span>
            </div>
            <!-- 列表信息 -->
            <div class="listInfo">
                <div class="listInfoName"  @click="goToServeComment(list)">{{list.name}}</div>
                <div class="good-comment-number">好评数
                  <inline-x-number v-model="list.goodCommentNumber" style="display:block;" :min="0" :max="list.numberVotes" width="50px" button-style="round"></inline-x-number>
                </div>

                <!-- <div class="listInfoTime">{{list.time}}</div> -->
            </div>
           </div>
        </div>
      </div>
      </div>
      <load-more tip="loading" v-show="showScrollerLoading"></load-more>
      <div v-if="noData&&!showScrollerLoading" style="margin:80px auto;width:200px;text-align:center;color:#666;">没有数据</div>
    </scroller>
    </group>
    <!-- 一键提交 -->
    <sticky ref="sticky"
            :offset="100"
            :check-sticky-support="false"
            disabled="disabled">
      <flexbox style="background:white;">
        <flexbox-item :span="3.5">
          <div @click="clickAll" class="home_div">
            <!-- <check-icon :value.sync="checkedAll"></check-icon>全选 -->
              <span @click="checkedAll = !checkedAll" :class="checkedAll?'my-check-icon-clicked':'my-check-icon'"></span>全选
          </div>
        </flexbox-item>
        <flexbox-item>
          <x-button style="background:#3891f0;color:white;" @click.native="checklist1.length > 0?showSubmitDialog = true:showSubmitErrorToast = true">一键提交</x-button>
        </flexbox-item>
      </flexbox>
    </sticky>
    <!-- 弹出框 -->
    <div>
      <x-dialog v-model="showSubmitDialog" class="dialog-demo">
        <span class="img-box">
          <img src="http://ui.haomo-tech.com/%E9%93%B6%E4%BF%A1%E9%95%BF%E8%BF%9C/assets/Path%20.png" alt="">
        </span>
        <div class="box-title">
           确认一键提交所选人员的服务质量评价吗</div>
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
import { Group, Cell, Tabbar, TabbarItem, XHeader, Icon, Search, CheckIcon, XButton, Flexbox, FlexboxItem, Sticky, XDialog, Toast, InlineXNumber, Scroller, LoadMore } from 'vux'
import _ from 'lodash'
import request from '@/utils/request'
import { paramEncode } from '@/utils'
import { setTimeout } from 'timers'
var i = 0
var j = 0
var len = 0
export default {
  name: 'serve',
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
    InlineXNumber,
    Scroller,
    LoadMore
  },
  data() {
    return {
      noData: false,
      results: [], // 搜索结果列表
      searchValue: '', // 搜索绑定的数据
      checklist1: [], // 选择列表
      commonList: ['name1', 'name2', 'name3', 'name4'], // 所有供选择的列表
      checkedAll: false, // 是否全选
      childNodeNum: 0,
      showSubmitDialog: false,
      showSubmitToast: false,
      showSubmitErrorToast: false,
      serveList: [],
      showScrollerLoading: true,
      pageNo: 1,
      onFacting: false,
      searchPageNo: 1,
      searching: false,
      tempSearchValue: ''
    }
  },
  created() {
    this.getTotalLength()
    this.getDatas()
  },
  watch: {
    searchValue() {
    },
    serveList() {
      console.log(this.serveList.length)
      if (this.serveList.length === 0) {
        this.noData = true
      } else {
        this.noData = false
      }
      console.log(this.noData)
    }
  },
  methods: {
    // 获取总评价数量
    getTotalLength() {
      for (i = 0; i < this.serveList.length; i++) {
        for (j = 0, len = this.serveList[i].list.length; j < len; j++) {
          this.childNodeNum++
        }
      }
    },
    searchFocus() {},
    searchCancel() {
      this.serveList = []
      this.searching = false
      this.searchPageNo = 1
      this.pageNo = 1
      this.getDatas()
      return false
    },
    resultClick() {},
    searchSubmit() {
      console.log('提交搜索')
      this.getSearchDatas(true)
    },
    searchChange() {},
    clickList() {},
    getSearchDatas(sub) {
      if (this.searchValue === this.tempSearchValue && sub) {
        return false
      }
      if (this.searchValue !== this.tempSearchValue) {
        this.serveList = []
        this.tempSearchValue = this.searchValue
      }
      console.log(sub)
      this.tempSearchValue = this.searchValue
      this.searching = true
      this.showScrollerLoading = true
      if (this.searchValue === '') {
        this.serveList = []
        this.searching = false
        this.searchPageNo = 1
        this.pageNo = 1
        this.getDatas()
        return false
      }
      var filter = "{'main_job_service_evaluation':{'title':{like:'%" + this.searchValue + "%'}}}"
      request('main_job_service_evaluations', {
        params: { filters: filter }
      }).then(res => {
        var serviceIds = []
        // 压缩查询到的id
        for (var i = 0; i < res.data.length; i++) {
          serviceIds.push(res.data[i].id)
        }
        if (serviceIds.length === 0) {
          this.serveList = []
          console.log('无数据')
          this.showScrollerLoading = false
          return false
        }
        if (localStorage.getItem('userId') === null) {
          return false
        }
          // 配置请求参数
        var params = {
          filters: {
            main_service_detail: {
              main_job_service_evaluation_id: {
                in: serviceIds
              },
              user_id: {
                equalTo: localStorage.getItem('userId')
              },
              status: {
                lessThan: '2'
              }
            }
          },
          includes: {
            main_job_service_evaluation: {
              includes: ['main_job_service_evaluation_id']
            }
          },
          pageNo: this.searchPageNo
        }
        // 请求数据
        request('main_service_details', { params: params }).then(res => {
          this.formatData(res)
        })
      })
    },
    onScrollBottom() {
      // 滑动触底
      if (this.serveList.length >= 1) {
        if (!this.onFacting) {
          console.log('运行了')
          this.onFacting = true
          setTimeout(() => {
            if (this.searching) {
              this.searchPageNo = this.searchPageNo + 1
              this.getSearchDatas(false)
            } else {
              this.pageNo = this.pageNo + 1
              this.getDatas()
            }
            this.onFacting = false
          }, 1000)
        }
      }
    },
    // 获取服务质量明细表数据
    getDatas() {
      if (this.pageSize === 0) {
        this.showScrollerLoading = false
        this.noData = true
        return false
      }
      var userId = localStorage.getItem('userId')
      if (localStorage.getItem('userId') === null) {
        this.noData = true
        return false
      }
      // 设置过滤器
      var filter = "{'main_service_detail':{'status':{lessThan:'2'},'user_id':{equalTo:'" + userId + "'}}}"
      var includes = "{'main_job_service_evaluation':{includes:['main_job_service_evaluation_id']}}"
      // 请求数据
      request('main_service_details', {
        params: { filters: filter, includes: includes, pageNo: this.pageNo, pageSize: 10 }
      }).then(res => {
        this.formatData(res)
      })
    },
    // 格式化获取的数据
    formatData(res) {
      var tempArray = []
      var userIdTempArray = []
      var tempArray2 = []
      var filter = ''
      console.log(res)
      for (var i = 0, len = res.data.length; i < len; i++) {
        if (res.data[i].includes.main_job_service_evaluation.evaluationTime === null) {
          res.data[i].includes.main_job_service_evaluation.evaluationTime = '2018-08-02 12:02:38'
        }
        if (res.data[i].includes.main_job_service_evaluation.title === null || res.data[i].includes.main_job_service_evaluation.type === null || res.data[i].superior.status === null || res.data[i].includes.main_job_service_evaluation.id === null) {
          console.log('数据格式有错误')
        } else {
          tempArray.push({
            name: res.data[i].includes.main_job_service_evaluation.title.split('的')[0],
            time: res.data[i].includes.main_job_service_evaluation.evaluationTime.split(' ')[0],
            type: res.data[i].includes.main_job_service_evaluation.type,
            status: res.data[i].superior.status,
            id: res.data[i].superior.id,
            userId: res.data[i].includes.main_job_service_evaluation.userId,
            goodCommentNumber: res.data[i].superior.praiseNumber,
            numberVotes: res.data[i].superior.numberVotes,
            badCommentText: res.data[i].superior.badReview,
            checked: false
          })
          userIdTempArray.push(res.data[i].includes.main_job_service_evaluation.userId)
        }
      }
      if (res.data.length === 0) {
        this.showScrollerLoading = false
        this.noData = true
        return false
      }
      filter = '{"hm_personnel":{"id":{in:[' + userIdTempArray + ']}}}'
      request('hm_personnels', {
        params: { filters: filter }
      }).then(res => {
        for (var i = 0; i < res.data.length; i++) {
          tempArray2[i] = {}
          tempArray2[i].title = res.data[i].departmentName
          if (tempArray2[i].userId === undefined) {
            tempArray2[i].userId = []
          }
          tempArray2[i].userId.push(res.data[i].id)
        }
                // 分配部门
        for (i = 0; i < tempArray.length; i++) {
          for (var j = 0; j < tempArray2.length; j++) {
            for (var k = 0; k < tempArray2[j].userId.length; k++) {
              if (tempArray[i].userId === tempArray2[j].userId[k]) {
                if (tempArray2[j].list === undefined) {
                  tempArray2[j].list = []
                }
                tempArray2[j].list.push(tempArray[i])
              }
            }
          }
        }
        // 合并重复部门
        for (i = 0; i < tempArray2.length; i++) {
          for (j = 0; j < tempArray2.length; j++) {
            if (tempArray2[i].title === tempArray2[j].title && i !== j && i < j) {
              tempArray2[i].list = tempArray2[i].list.concat(tempArray2[j].list)
              tempArray2.splice(j, 1)
            }
          }
        }
        // 根据部门首字母进行排序
        for (i = 0; i < tempArray2.length; i++) {
          tempArray2[i].list.sort(function(param1, param2) {
            console.log(name)
            return param1.name.localeCompare(param2.name)
          })
          tempArray2.sort(function(param1, param2) {
            return param1.title.localeCompare(param2.title)
          })
        }
        console.log(tempArray2)
        if (tempArray2.length < this.pageSize) {
          this.pageSize = 0
        }
        this.serveList = this.serveList.concat(tempArray2)
        if (this.serveList.length < 10) {
          this.showScrollerLoading = false
        }
        console.log(210, this.serveList)
      })
    },
    // 跳转评价详情
    goToServeComment(list) {
      // if (localStorage.getItem('serveList')) {
      //   const temp = JSON.parse(localStorage.getItem('serveList'))
      // }
      localStorage.setItem('needBadCommentPeopleList', JSON.stringify([list]))
      this.$router.push({ name: 'serveComment' })
    },
    // 选中当前数据
    listCheckClick(list) {
      list.checked = !list.checked
      this.checkedAll = false
      if (list.checked === true) {
        this.checklist1.push(list)
        if (this.checklist1.length === this.childNodeNum) {
          this.checkedAll = true
        }
        return false
      }
      if (list.checked === false) {
        for (i = 0, len = this.checklist1.length; i < len; i++) {
          if (this.checklist1[i].name === list.name) {
            this.checklist1.splice(i, 1)
          }
        }
      }
    },
    // 确认一键提交按钮被点击
    affirmSubmit() {
      this.showSubmitDialog = false
      this.showSubmitToast = true
      var tempArray = [] // 有差评的数据
      var tempArray2 = [] // 全部好评的数据
      for (var i = 0, len = this.checklist1.length; i < len; i++) {
        if (this.checklist1[i].goodCommentNumber !== this.checklist1[i].numberVotes && this.checklist1[i].status === 0) {
          tempArray.push(this.checklist1[i])
        }
        if (this.checklist1[i].goodCommentNumber === this.checklist1[i].numberVotes || this.checklist1[i].status === 1) {
          tempArray2.push(this.checklist1[i])
        }
      }
      this.showSubmitToast = true
      let params = []
      let date = new Date()
      let month = date.getMonth() + 1
      if (month < 10) {
        month = '0' + month
      }
      date = date.toString().split(' ')
      date = date[3] + '-' + month + '-' + date[2] + ' ' + date[4]
      _.each(tempArray2, function(item, key) {
        const temp = {}
        temp.id = item.id
        temp.status = 2
        temp.praiseNumber = item.goodCommentNumber
        temp.badNumber = item.numberVotes - item.goodCommentNumber
        temp.badNumber = 0
        temp.badReview = item.badCommentText || '无评价'
        temp.evaluationTime = date
        params.push(temp)
      })
      params = JSON.stringify(params)
      request('main_service_details/edit/batch/', {
        params: {
          params: params
        },
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'X-Auth-Token': '7235ba9e71f7493d9d56b29401d9f47c',
          'LoginType': 'web'
        },
        transformRequest: paramEncode
      })
      // 如果有差评的  跳转至差评列表页
      localStorage.setItem('needBadCommentPeopleList', JSON.stringify(tempArray))
      if (tempArray.length) {
        this.$router.push({ name: 'serveComment' })
      } else {
        // 如果全部好评 刷新当前列表
        this.serveList = []
        this.getDatas()
      }
    },
    // 全选
    checkAll() {
      // this.checklist1 = []
    },
    // 点击全选
    clickAll() {
      console.log('点击全选')
      // const all = _.without.appy(_, [this.commonList].concat(this.checklist1))
      // this.checklist1 = all
      // if (this.checklist1.length ==== 4) {
      //   this.checklist1 = []
      // } else {
      //   this.checklist1 = this.commonList
      // }
      if (this.checkedAll === false) {
        this.checkAll = true
        for (j = 0; j < this.serveList.length; j++) {
          for (i = 0, len = this.serveList[j].list.length; i < len; i++) {
            this.serveList[j].list[i].checked = false
          }
        }
        this.checklist1.splice(0, this.checklist1.length)
      } else if (this.checkedAll === true) {
        this.checklist1.splice(0, this.checklist1.length)
        this.checkAll = false
        for (j = 0; j < this.serveList.length; j++) {
          for (i = 0, len = this.serveList[j].list.length; i < len; i++) {
            this.serveList[j].list[i].checked = true
            this.checklist1.push(this.serveList[j].list[i])
          }
        }
      }
    }
  },
  mounted() {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.serve .weui-toast {
  border-radius: 25px;
}
.serve .weui-search-bar__cancel-btn {
  display: block;
}
.serve .vux-sticky-box {
  position: fixed;
  width: 100%;
  bottom: 0;
}
.serve .groupList {
  padding-bottom: 50px;
}
.serve .aListData {
  display: flex;
  flex-direction: row;
  padding: 10px 0;
}
.serve .serveClassifyTitle {
  padding: 10px 5px;
  border-bottom: 1px solid #eee;
  color: #666;
  font-size: 14px;
}
.serve .listCheck {
  height: 30px;
  line-height: 30px;
}
.serve .aListData {
  height: 30px;
  position: relative;
}
.serve .listInfo {
  height: 30px;
  margin-left: 10px;
  line-height: 30px;
  display: flex;
  flex-direction: row;
}
.serve .listInfoName {
  font-size: 16px;
  color: #333;
  display: inline-block;
  width: 130px;
}
.serve .good-comment-number {
  margin-left: 0px;
  position: absolute;
  right: 0;
  top: 10px;
}
.serve .listInfo .vux-inline-x-number {
  float: right;
  margin-top: 0px;
  margin-left: 20px;
}
.serve.listInfoTime {
  font-size: 13px;
  color: #888;
}
.serve .aListData {
  border-bottom: 1px solid #eee;
}

.serve .weui-dialog {
  border-radius: 8px;
  padding-bottom: 8px;
  height: 150px;
  max-width: 400px;
}
.serve .dialog-title {
  color: #666;
}
.serve .img-box {
  overflow: hidden;
}
.serve .vux-close {
  margin-top: 8px;
  margin-bottom: 8px;
}
.serve .img-box {
  float: left;
  background: #e11c1c;
  display: block;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  margin-left: 20px;
  margin-top: 20px;
}
.serve .img-box img {
  height: 50%;
  margin-top: 11px;
}
.serve .box-title {
  line-height: 20px;
  margin-top: 20px;
  text-align: left;
  margin-left: 90px;
  margin-right: 20px;
  width: 200px;
  height: 100px;
}
.serve .vux-sure {
  color: #e11c1c;
  margin-left: 20px;
}
.serve .bottomBtn {
  position: absolute;
  bottom: 7px;
  right: 10px;
}
.serve .my-check-icon {
  display: inline-block;
  width: 15px;
  height: 15px;
  background: white;
  position: relative;
  margin-left: 20px;
  border: 1px solid #c7c7c7;
  margin-right: 10px;
  margin-top: 5px;
}
.serve .my-check-icon-clicked {
  display: inline-block;
  width: 15px;
  height: 15px;
  margin-top: 5px;
  background: #3891f0;
  border: 1px solid #3891f0;
  position: relative;
  margin-left: 20px;
  margin-right: 10px;
}
.serve .my-check-icon-clicked::after {
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
</style>
