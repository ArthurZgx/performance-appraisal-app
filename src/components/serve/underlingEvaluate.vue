<template>
  <div class="underlingServe">
    <x-header :right-options="{showMore: false}"
              @on-click-more="showMenus = true">
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
            ref="search">
    </search>
    </div>
    <!-- v-if="list.status === '2'"-->
     <div style="padding-left: 15px;color: #666;font-size: 14px;margin-top: 5px;">最高可投好评票 {{praiseSetting.residualPraiseNumber}}&nbsp;&nbsp;|&nbsp;&nbsp;最高可投差评票 {{praiseSetting.residualBadNumber}}</div>
    <group class="home_group groupList">
      <scroller lock-x @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offset="40" :style="{height: scrollHeight+'px'}">
      <div>
        <div class="aGroupList" v-for="(item,index) in serveList" :key="index">
          <div class="serveClassifyTitleBg">
          <div class="serveClassifyTitle">{{item.title}}</div>
          </div>
          <div>
            <div v-for="(list,index) in item.list" :key="index" class="aListData">
              <div>
                <!-- <check-icon :value.sync="list.checked"></check-icon> -->
                <!-- 勾选按钮 -->
                <span @click="listCheckClick(list)" :class="list.checked?'my-check-icon-clicked':'my-check-icon'"></span>
              </div>
              <!-- 列表信息 -->
              <div class="listInfo">
                <div>
                  <div class="listInfoName"  @click="goToServeComment(list)">{{list.mainUserName}}</div>
                  <div style="color: rgb(41 155 232);margin-top: 5px;">推送票数：{{ list.numberVotes }}</div>
                </div>
                  <div>
                    <table>
                      <tr>
                        <td class="kh-table-text"></td>
                        <td class="kh-table-text">差</td>
                        <td class="kh-table-text">中</td>
                        <td class="kh-table-text">好</td>
                        <td class="kh-table-text"></td>
                      </tr>
                      <tr>
                        <td class="kh-table-text">
                          <a @click="handleChangePraiseNumber(list, -1)" class="kh-number-selector kh-number-selector-sub":class="{'kh-number-disabled': getMinDisabled(list)}">
                            <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="18" height="18"><defs></defs><path d="M863.74455 544.00086 163.424056 544.00086c-17.664722 0-32.00086-14.336138-32.00086-32.00086s14.336138-32.00086 32.00086-32.00086l700.320495 0c17.695686 0 31.99914 14.336138 31.99914 32.00086S881.440237 544.00086 863.74455 544.00086z"></path></svg>
                          </a>
                        </td>
                        <td class="kh-table-text">{{list.badNumber}}</td>
                        <td class="kh-table-text">{{list.middleNumber}}</td>
                        <td class="kh-table-text">{{list.praiseNumber}}</td>
                        <td class="kh-table-text">
                          <a @click="handleChangePraiseNumber(list, 1)" class="kh-number-selector kh-number-selector-plus" :class="{'kh-number-disabled': getMaxDisabled(list)}">
                            <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20"><defs></defs><path d="M863.328262 481.340895l-317.344013 0.099772L545.984249 162.816826c0-17.664722-14.336138-32.00086-32.00086-32.00086s-31.99914 14.336138-31.99914 32.00086l0 318.400215-322.368714-0.17718c-0.032684 0-0.063647 0-0.096331 0-17.632039 0-31.935493 14.239806-32.00086 31.904529-0.096331 17.664722 14.208843 32.031824 31.871845 32.095471l322.59234 0.17718 0 319.167424c0 17.695686 14.336138 32.00086 31.99914 32.00086s32.00086-14.303454 32.00086-32.00086L545.982529 545.440667l317.087703-0.099772c0.063647 0 0.096331 0 0.127295 0 17.632039 0 31.935493-14.239806 32.00086-31.904529S880.960301 481.404542 863.328262 481.340895z"></path></svg>
                          </a></td>
                      </tr>
                    </table>
                  </div>
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
      <flexbox style="background:white;border-top:1px solid #eee">
        <flexbox-item :span="6" style="text-align:center;">
          <div @click="clickAll" class="home_div">
            <!-- <check-icon :value.sync="checkedAll"></check-icon>全选 -->
              <span @click="checkedAll = !checkedAll" :class="checkedAll?'my-check-icon-clicked':'my-check-icon'"></span>全选
          </div>
        </flexbox-item>
        <flexbox-item>
          <x-button style="background:#5177AA;color:white;border-radius:0;" @click.native="checklist1.length > 0?showSubmitDialog = true:showSubmitErrorToast = true">一键提交</x-button>
        </flexbox-item>
      </flexbox>
    </sticky>
    <!-- 弹出框 -->
    <div>
      <x-dialog v-model="showSubmitDialog" class="dialog-demo">
        <span class="img-box">
          <img src="@/assets/gantan.png" alt="">
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
import { setTimeout } from 'timers'
var i = 0
var j = 0
var len = 0
export default {
  name: 'underlingServe',
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
      tempSearchValue: '',
      scrollHeight: '0',
      praiseSetting: {
        praiseNumber: 0,
        badNumber: 0,
        residualPraiseNumber: 0,
        residualBadNumber: 0
      }
    }
  },
  async created() {
    await this.getSysConfig()
    this.getTotalLength()
    this.getDataList()
  },
  watch: {
    searchValue() {
    },
    serveList() {
      // console.log(this.serveList.length)
      if (this.serveList.length === 0) {
        this.showScrollerLoading = false
        this.noData = true
      } else {
        this.noData = false
      }
      // console.log(this.noData)
    }
  },
  methods: {
    getSysConfig() {
      var userId = localStorage.getItem('userId')
      return request('serviceEvaluate/underling/getMyEvaluateVotes', {
        method: 'POST',
        params: {
          userId: userId
        }
      }).then(res => {
        this.praiseSetting.praiseNumber = res.data.praiseNumber || 0
        this.praiseSetting.residualPraiseNumber = res.data.residualPraiseNumber || 0
        this.praiseSetting.badNumber = res.data.badNumber || 0
        this.praiseSetting.residualBadNumber = res.data.residualBadNumber || 0
      }).catch(err => {
        console.log('请求出错', err)
      })
    },
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
      if (this.searching) {
        this.showScrollerLoading = true
        this.serveList = []
        this.searching = false
        this.searchPageNo = 1
        this.pageNo = 1
        this.getDataList()
        return false
      }
    },
    resultClick() {},
    searchSubmit() {
      // console.log('提交搜索')
      this.getSearchData(true)
    },
    searchChange() {},
    clickList() {},
    getSearchData(sub) {
      if (this.searchValue === this.tempSearchValue && sub) {
        return false
      }
      if (this.searchValue !== this.tempSearchValue) {
        this.serveList = []
        this.tempSearchValue = this.searchValue
      }
      // console.log(sub)
      this.tempSearchValue = this.searchValue
      this.showScrollerLoading = true
      if (this.searchValue === '') {
        this.serveList = []
        this.searching = false
        this.searchPageNo = 1
        this.pageNo = 1
        this.getDataList()
        return false
      }
      var filter = {
        'main_job_service_evaluation': {
          'title': { like: '%' + this.searchValue + '%' }
        }
      }
      request('main_job_service_evaluations', {
        params: {
          filters: filter,
          pageSize: 20000
        }
      }).then(res => {
        var serviceIds = []
        // 压缩查询到的id
        for (var i = 0; i < res.data.length; i++) {
          serviceIds.push(res.data[i].id)
        }
        if (serviceIds.length === 0) {
          this.serveList = []
          // console.log('无数据')
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
    },
    // 获取服务质量明细表数据
    getDataList() {
      if (this.pageSize === 0) {
        this.showScrollerLoading = false
        this.noData = true
        return false
      }
      var userId = localStorage.getItem('userId')
      if (localStorage.getItem('userId') === null) {
        // console.log(localStorage.getItem('userId'))
        this.showScrollerLoading = false
        this.noData = true
        return false
      }

      // 请求数据
      request('serviceEvaluate/underling/getMy', {
        params: { userId: userId.toString() }
      }).then(res => {
        this.formatData(res)
      }).catch(err => {
        console.log('请求出错', err)
        this.showScrollerLoading = false
        this.noData = true
      })
    },
    // 格式化获取的数据
    formatData(res) {
      var tempArray2 = []
      // console.log(res)
      for (var i = 0, len = res.data.length; i < len; i++) {
        for (var j = 0, len1 = res.data[i].list.length; j < len1; j++) {
          res.data[i].list[j].checked = false
          res.data[i].list[j].type = 1
        }
        tempArray2.push(res.data[i])
      }
      console.log(tempArray2)

      this.serveList = this.serveList.concat(tempArray2)
      if (this.serveList.length < 10) {
        this.showScrollerLoading = false
      }
      this.praiseSetting.praiseNumber = this.getMaxNumberVotes('residualPraiseNumber')
      this.praiseSetting.badNumber = this.getMaxNumberVotes('residualBadNumber')
      this.handleChangePraiseSetting()
      // console.log(210, this.serveList)
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
      var tempArray = [] // 有差评的数据
      var tempArray2 = [] // 全部好评的数据
      for (var i = 0, len = this.checklist1.length; i < len; i++) {
        if (this.checklist1[i].badNumber > 0 && this.checklist1[i].status === 0) {
          tempArray.push(this.checklist1[i])
        }
        if (this.checklist1[i].badNumber === 0 || this.checklist1[i].status === 1) {
          tempArray2.push(this.checklist1[i])
        }
      }
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
        temp.praiseNumber = item.praiseNumber
        temp.middleNumber = item.middleNumber
        temp.badNumber = item.badNumber
        // temp.badNumber = 0
        temp.badReview = item.badCommentText || '无评价'
        temp.evaluationTime = date
        params.push(temp)
      })
      params = JSON.stringify(params)
      request('serviceEvaluate/underling/commit/', {
        data: params,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'X-Auth-Token': '7235ba9e71f7493d9d56b29401d9f47c',
          'LoginType': 'web'
        }
        // transformRequest: paramEncode
      }).then(res => {
        this.showSubmitToast = true
        // 如果有差评的  跳转至差评列表页
        localStorage.setItem('needBadCommentPeopleList', JSON.stringify(tempArray))
        if (tempArray.length) {
          this.$router.push({ name: 'serveComment' })
        } else {
          // 如果全部好评 刷新当前列表
          if (this.searching) {
            this.serveList = []
            this.searchPageNo = 1
            this.getSearchData(false)
          } else {
            this.serveList = []
            this.pageNo = 1
            this.pageSize = 100000
            this.getDataList()
          }
        }
      })
    },
    // 全选
    checkAll() {
      // this.checklist1 = []
    },
    // 点击全选
    clickAll() {
      // console.log('点击全选')
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
    },
    handleChangePraiseSetting() {
      // 计算剩余的好评票数
      let totalPraiseVoteNumber = 0
      let totalBadVoteNumber = 0
      this.serveList.forEach(item => {
        item.list.forEach(child => {
          totalPraiseVoteNumber += (child.praiseNumber || 0)
          totalBadVoteNumber += (child.badNumber || 0)
        })
      })
      this.praiseSetting.residualPraiseNumber = this.praiseSetting.praiseNumber - totalPraiseVoteNumber
      this.praiseSetting.residualBadNumber = this.praiseSetting.badNumber - totalBadVoteNumber
    },
    getMinDisabled(list) {
      if (list.praiseNumber > 0) return false
      if (list.badNumber === list.numberVotes) return true
      if (this.praiseSetting.residualBadNumber === 0) return true
    },
    getMaxDisabled(list) {
      if (list.badNumber > 0) return false
      if (list.praiseNumber === list.numberVotes) return true
      if (this.praiseSetting.residualPraiseNumber === 0) return true
    },
    handleChangePraiseNumber(list, count) {
      if (count < 0 && this.getMinDisabled(list)) {
        return
      }
      if (count > 0 && this.getMaxDisabled(list)) {
        return
      }
      if (count < 0) {
        if (list.praiseNumber > 0) {
          list.praiseNumber--
          list.middleNumber++
        } else {
          list.middleNumber--
          list.badNumber++
        }
      }
      if (count > 0) {
        if (list.badNumber > 0) {
          list.badNumber--
          list.middleNumber++
        } else {
          list.middleNumber--
          list.praiseNumber++
        }
      }
      this.handleChangePraiseSetting()
    },
    getMaxNumberVotes(field) {
      let max = 0
      this.serveList.forEach(item => {
        item.list.forEach(child => {
          max += child.numberVotes
        })
      })
      if (max > this.praiseSetting[field]) {
        return this.praiseSetting[field]
      }
      return max
    }
  },
  mounted() {
    this.scrollHeight = document.documentElement.clientHeight - 165
    const self = this
    // console.log('设置滚动区域高度为' + this.scrollHeight)
    setTimeout(function() {
      // console.log(document.documentElement.clientHeight)
      self.scrollHeight = document.documentElement.clientHeight - 165
    }, 500)
    // if (localStorage.getItem('serve') === 'true') {
    //   console.log('刷新一次')
    //   location.reload()
    //   localStorage.removeItem('serve')
    // } else {
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.serve .weui-toast {
  border-radius: 25px;
}
.serve .weui-search-bar__cancel-btn {
  display: none;
  color: #666;
}
.serve .vux-sticky-box {
  position: fixed;
  width: 100%;
  bottom: 0;
}
.serve .groupList {
  padding-bottom: 70px;
  position: fixed;
  top: 120px;
  left: 0;
  height: 100%;
  width: 96%;
}
.serve .weui-cells{
  margin-top: 0px;
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
  height: 60px;
  position: relative;
}
.serve .listInfo {
  height: 60px;
  margin-left: 10px;
  line-height: 30px;
  display: flex;
  flex-direction: row;
}
.serve .listInfoName {
  font-size: 18px;
  color: #333;
  display: inline-block;
  width: 115px;
}
.serve .good-comment-number {
  margin-left: 0px;
  position: absolute;
  right: 0;
  top: 45px;
}
.serve .middle-comment-number {
  margin-left: 0px;
  position: absolute;
  right: 0;
  bottom: 5px;
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
.clearfix {
   *zoom: 1;
   height: 50px;
}
  /* 关于客户最新需求的样式更改 */
.weui-search-bar{
  background-color: white !important;
}
/*更改标题字号*/
.vux-header-title-area, .vux-header .vux-header-title{
  font-size: 24px !important;
  font-weight: bold !important;
}
/*隐藏返回文字*/
.vux-header-back{
  width: 0;
  overflow: hidden;
}
/*返回按钮*/
.vux-header .vux-header-left .left-arrow:before{
  width: 12px !important;
  height: 12px !important;
  border: 1px solid #5177aa !important;
  border-width: 3px 0 0 3px !important;
}
/*搜索框上下线*/
.weui-search-bar:before{
  display: none;
}
.weui-search-bar:after{
  display: none;
}
/*搜索框背景*/
.weui-search-bar__label{
  background: rgba(142,143,143,0.12) !important;
}
.weui-search-bar__label .weui-icon-search{
  display: none;
}
.weui-search-bar__label span{
  float: left;
  margin-left: 30px;
  margin-top: 8px;
}
.weui-search-bar__box .weui-search-bar__input{
  width: 100% !important;
  height: 29px !important;
}
.weui-search-bar__box .weui-icon-search{
  top: 5px !important;
}
.weui-search-bar.weui-search-bar_focusing .weui-search-bar__cancel-btn{
  margin-top: 5px;
}
.weui-icon-clear:before{
  margin-top: 5px;
}
.weui-cells:before{
  border-top: 1px solid white !important;
}
.weui-search-bar__label{
  border-radius: 10px !important;
}
.weui-search-bar__form{
  background: white !important;
}
.weui-search-bar__form:after{
  /*border: none !important;*/
  border-radius: 20px !important;
}
/* 部门名字展示 */
.serveClassifyTitleBg{
  padding: 10px 0;
  border-bottom: 1px solid #F4F4F4;
}
.serve .serveClassifyTitle{
  padding: 0 10px;
  border-bottom: none;
  border-left: 5px solid #5177AA;
}
.serve .weui-cells{
  padding: 0 10px;
}
.serve .weui-cells:after{
  display: none;
}
.vux-label{
  font-size: 18px;
}
.groupList{
  padding: 0 12px;
}
.kh-number-selector {
  color: #5177aa;
  border-radius: 50%;
  border: 1px solid #5177aa;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px;
}
.kh-number-selector svg {
    fill: #5177aa;
}
.kh-number-disabled {
  color: #ccc;
  border: 1px solid #ccc;
}
.kh-number-disabled svg {
    fill: #ccc;
}
.serve .kh-table-text {
  color: #666;
  font-size: 18px;
  padding: 0px 2px;
  text-align: center;
}

</style>
