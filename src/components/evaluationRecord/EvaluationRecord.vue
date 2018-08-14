<template>
  <div class="evaluationRecord" :style="{height: screenHeight + 'px'}">

    <div class="vux-demo">
      <x-header :right-options="{showMore: false}"
                style="box-shadow:none;"
                @on-click-more="showMenus = true">
                考评记录
      </x-header>
    </div>

    <flexbox style="background:#F0EFF5;font-size:13px;">
      <flexbox-item><div class="flex-demo">
        <cell
          :title="('考评类型')"
          is-link
          :border-intent="false"
          :arrow-direction="kaoping ? 'up' : 'down'"
          @click.native="kaoping = !kaoping,chakan = false,riqi = false" ></cell>
      </div></flexbox-item>
      <flexbox-item v-if="(pageType === 'inSubmit')">
      <div class="flex-demo">
        <cell
          :title="('查看类型')"
          is-link
          :border-intent="false"
          :arrow-direction="chakan ? 'up' : 'down'"
          @click.native="chakan = !chakan,kaoping = false, riqi = false" ></cell>
      </div></flexbox-item>
      <flexbox-item><div class="flex-demo">
        <cell
          :title="('日期')"
          is-link
          :border-intent="false"
          :arrow-direction="riqi ? 'up' : 'down'"
          @click.native="riqi = !riqi,kaoping = false,chakan = false" ></cell>
      </div></flexbox-item>
    </flexbox>
    <!-- 判断点击菜单类型,显示选择栏 -->
    <!-- 显示考评类型 -->
    <group v-show="kaoping" style="margin-top:-0em;">
      <radio v-model="r1" :options="radio001" :selected-label-style="{color:'#3891F0'}"></radio>
    </group>
    <!-- 显示查看类型 -->
    <group v-show="chakan" style="margin-top:-0em;">
      <radio v-model="r2" :options="radio002" :selected-label-style="{color:'#3891F0'}"></radio>
    </group>
    <group v-show="riqi" style="margin-top:-0em;">
  <datetime-view v-model="selectedDate" ref="datetime" format="YYYY-MM"></datetime-view>
  <flexbox>
    <flexbox-item><x-button @click.native="clearSelectedDate">清空</x-button></flexbox-item>
    <flexbox-item><x-button @click.native="selectedDateChange" type="primary">确认</x-button></flexbox-item>
  </flexbox>
    </group>
    <!-- 选中菜单栏设置半透明蒙版 -->
    <div class="mask" v-if="riqi||chakan||kaoping" @click="riqi=false,chakan = false, kaoping = false"></div>

    <!-- 显示考评信息 -->
    <!-- <panel :header="('')" :list="list" :type="type" @on-img-error="onImgError"></panel> -->
    <group>
      <scroller lock-x @on-scroll-bottom="onScrollBottom" ref="scrollerBottom" :scroll-bottom-offset="40" height="-92">
      <div>
      <cell v-for="(item,index) in list" :key="index" :title="item.title" :inline-desc="pageType == 'inSubmit'?'创建时间 '+item.createTime:'评价日期 '+item.date" 
      @click.native="goTo(item.id,item.type,item.status,item)"></cell>
      </div>
      <load-more tip="loading" v-show="showScrollerLoading"></load-more>
      <div v-if="noData&&!showScrollerLoading" style="margin:80px auto;width:200px;text-align:center;color:#666;">没有数据</div>
    </scroller>
    </group>
    <toast v-model="showErrorDateToast" type="text" style="width:12.6em;" :time="800" is-show-mask text="仅有一年内数据" position="bottom"></toast>
  </div>
</template>

<script>
  import { Group, Flexbox, FlexboxItem, CellBox, Cell, Panel, XHeader, Radio, InlineCalendar, Scroller, LoadMore, DatetimeView, XButton, Toast } from 'vux'
  import request from '../../../src/utils/request.js'
  // import _ from 'lodash'
  export default {
    name: 'personal',
    components: {
      Group,
      Cell,
      CellBox,
      Flexbox,
      FlexboxItem,
      Panel,
      XHeader,
      Radio,
      InlineCalendar,
      Scroller,
      LoadMore,
      DatetimeView,
      XButton,
      Toast
    },
    data() {
      return {
        r1: '全部类型',
        r2: '全部',
        msg: 'Welcome to Your Vue.js App',
        kaoping: false,
        chakan: false,
        riqi: false,
        radio001: ['全部类型', '服务质量评价', '工作完成评价'],
        radio002: ['全部', '已查看通知', '未查看通知'],
        type: '2',
        selectedDate: '2018-08',
        isSelectedDate: false,
        list: [],
        serviceDataList: [],
        jobDataList: [],
        selectedOptionType: '',
        pageType: '',
        tempDataList: [],
        showScrollerLoading: true,
        pageNo: 1,
        onFacting: false,
        pageSize: 5000,
        showErrorDateToast: false,
        year: 2018,
        month: 8,
        noData: false,
        screenHeight: 600
      }
    },
    mounted() {
      console.log(window.screen.height)
      console.log(window.screen.availHeight)
      this.screenHeight = window.screen.availHeight
      // 初始化数据
      this.initData()
      var date = new Date()
      this.year = date.getFullYear()
      this.month = date.getMonth() + 1
      if (this.month < 10) {
        this.month = '0' + this.month
      }
    },
    methods: {
      onScrollBottom() {
        // 滑动触底
        // if (this.list.length >= 1) {
        //   if (!this.onFacting) {
        //     console.log('运行了')
        //     this.pageNo = this.pageNo + 1
        //     this.onFacting = true
        //     setTimeout(() => {
        //       this.initData()
        //       this.onFacting = false
        //     }, 1000)
        //   }
        // }
      },
      initData() {
        this.pageType = this.$route.params.type || localStorage.getItem('selectedOptionType')
        if (this.$route.params.type) {
          localStorage.setItem('selectedOptionType', this.$route.params.type)
        }
        var type = this.$route.params.type || localStorage.getItem('selectedOptionType')
        switch (type) {
          // 如果是已提交
          case 'alreadySubmit':
            this.getDatas('[2,4]', '[2,4]', 'in')
            break
            // 如果是已过期
          case 'pastSubmit':
            this.getDatas("'3'", "'3'")
            break
            // 如果是未提交
          case 'inSubmit':
            this.getDatas("'2'", "'2'", 'lessThan')
            break
        }
      },
      onImgError(item, $event) {
        console.log(item, $event)
      },
      // 关闭筛选框
      closeRadioWindow() {
        this.chakan = false
        this.riqi = false
        this.kaoping = false
      },
      selectedMouth(index) {
        this.selectedMouthIndex = index
        this.closeRadioWindow()
      },
      onDateChange() {
        this.riqi = false
      },
      // 类型筛选
      evaluationType() {
        this.list = []
        // this.pageSize = 5
        // this.pageNo = 1
        // this.initData()
        if (this.r1 === '服务质量评价') {
          this.list = this.serviceDataList
          if (this.list.length === 0) {
            this.noData = true
          } else {
            this.noData = false
          }
        } else if (this.r1 === '工作完成评价') {
          this.list = this.jobDataList
          if (this.list.length === 0) {
            this.noData = true
          } else {
            this.noData = false
          }
        } else if (this.r1 === '全部类型') {
          this.list = this.serviceDataList.concat(this.jobDataList)
          if (this.list.length === 0) {
            this.noData = true
          } else {
            this.noData = false
          }
        }
      },
      // 是否查看筛选
      watchEvaluationType() {
        this.showScrollerLoading = true
        this.list = []
        this.pageSize = 5000
        this.pageNo = 1
        this.initData()
      },
      clearSelectedDate() {
        // 恢复为当前日期
        var date = new Date()
        this.year = date.getFullYear()
        this.month = date.getMonth() + 1
        if (this.month < 10) {
          this.month = '0' + this.month
        }
        this.selectedDate = this.year + '-' + this.month
        this.$refs.datetime.render()
        console.log(this.selectedDate)
        this.isSelectedDate = false
        this.closeRadioWindow()
        this.showScrollerLoading = true
        this.list = []
        this.pageSize = 5000
        this.pageNo = 1
        this.initData()
      },
      // 根据日期筛选
      selectedDateChange() {
        console.log(this.selectedDate)
        var year = this.selectedDate.split('-')[0]
        var month = this.selectedDate.split('-')[1]
        var date = new Date()
        var year1 = date.getFullYear()
        var month1 = date.getMonth() + 1
        if (month1 < 10) {
          month1 = '0' + month1
        }
        if ((year1 - year === 1 && month > month1) || (year1 - year === 0 && month1 >= month)) {
          this.isSelectedDate = true
          this.closeRadioWindow()
          this.showScrollerLoading = true
          this.list = []
          this.pageSize = 5000
          this.pageNo = 1
          this.year = year
          this.month = month
          this.initData()
        } else {
          this.showErrorDateToast = true
        }
      },
      // 获取数据
      getDatas(param1, param2, type) {
        if (localStorage.getItem('userId') === null) {
          this.noData = true
          this.showScrollerLoading = false
          return false
        }
        if (this.pageSize === 0) {
          return false
        }
        var userId = localStorage.getItem('userId')
        if (type === undefined) {
          type = 'equalTo'
        }
        // 判断是否查看
        if (this.r2 === '已查看通知') {
          type = 'in'
          param1 = param2 = '[1]'
        } else if (this.r2 === '未查看通知') {
          type = 'equalTo'
          param1 = 0
          param2 = 0
        }
        // 设置过滤器
        var filter = '{"main_service_detail":{"status":{' + type + ' : ' + param1 + '},"user_id":{equalTo:"' + userId + '"}}}'
        if (this.isSelectedDate) {
          filter = '{"main_service_detail":{"status":{' + type + ':' + param1 + '},"user_id":{equalTo:"' + userId + '"},"year":{equalTo:"' + this.year + '"},"month":{equalTo:"' + this.month + '"}}}'
        }
        var includes = "{'main_job_service_evaluation':{includes:['main_job_service_evaluation_id']}}"
        // 请求数据
        request('main_service_details', {
          params: { filters: filter, includes: includes, pageNo: this.pageNo, pageSize: this.pageSize }
        }).then(res => {
          var tempArray = []
          for (var i = 0, len = res.data.length; i < len; i++) {
            // 如果数据格式错误就分配一个参数
            if (res.data[i].includes.main_job_service_evaluation.evaluationTime === null) {
              res.data[i].includes.main_job_service_evaluation.evaluationTime = '2018-08-02 12:02:38'
            }
            if (res.data[i].includes.main_job_service_evaluation.title === null || res.data[i].includes.main_job_service_evaluation.type === null || res.data[i].superior.status === null || res.data[i].includes.main_job_service_evaluation.id === null || res.data[i].includes.main_job_service_evaluation === undefined) {
              console.log('格式有错误')
            } else {
              // 压入数据
              console.log(res.data)
              tempArray.push({
                title: res.data[i].includes.main_job_service_evaluation.title,
                date: res.data[i].includes.main_job_service_evaluation.evaluationTime.split(' ')[0],
                createTime: res.data[i].superior.createTime.split(' ')[0],
                type: res.data[i].includes.main_job_service_evaluation.type,
                status: res.data[i].superior.status,
                id: res.data[i].includes.main_job_service_evaluation.id,
                year: res.data[i].superior.year,
                month: res.data[i].superior.month,
                numberVotes: res.data[i].superior.numberVotes,
                goodCommentNumber: res.data[i].superior.praiseNumber,
                badCommentText: res.data[i].superior.badReview
              })
            }
          }
          // 获取数据
          this.serviceDataList = tempArray
          // 更改过滤条件
          filter = '{"main_job_detail":{"status":{' + type + ' : ' + param2 + '},"user_id":{equalTo:"' + userId + '"}}}'
          if (this.isSelectedDate) {
            filter = '{"main_job_detail":{"status":{' + type + ':' + param2 + '},"user_id":{equalTo:"' + userId + '"},"year":{equalTo:"' + this.year + '"},"month":{equalTo:"' + this.month + '"}}}'
          }
          // 再次请求数据
          request('main_job_details', {
            params: { filters: filter, includes: includes, pageNo: this.pageNo, pageSize: this.pageSize }
          }).then(res => {
            console.log(310, res)
            tempArray = []
            for (var i = 0, len = res.data.length; i < len; i++) {
              // 如果数据格式错误就分配一个参数
              if (res.data[i].includes.main_job_service_evaluation.evaluationTime === null) {
                res.data[i].includes.main_job_service_evaluation.evaluationTime = '2018-08-02 12:02:38'
              }
              if (res.data[i].includes.main_job_service_evaluation.title === null || res.data[i].includes.main_job_service_evaluation.type === null || res.data[i].superior.status === null || res.data[i].includes.main_job_service_evaluation.id === null || res.data[i].includes.main_job_service_evaluation === undefined) {
                console.log('格式有错误')
              } else {
                tempArray.push({
                  title: res.data[i].includes.main_job_service_evaluation.title,
                  date: res.data[i].includes.main_job_service_evaluation.evaluationTime.split(' ')[0],
                  createTime: res.data[i].superior.createTime.split(' ')[0],
                  type: res.data[i].includes.main_job_service_evaluation.type,
                  status: res.data[i].superior.status,
                  id: res.data[i].includes.main_job_service_evaluation.id,
                  year: res.data[i].superior.year,
                  month: res.data[i].superior.month,
                  userName: res.data[i].includes.main_job_service_evaluation.title.split('的')[0]
                })
              }
            }
            // 去除重复数据
            for (var a = 0; a < tempArray.length; a++) {
              for (var c = 1; c < tempArray.length; c++) {
                if (tempArray[a].id === tempArray[c].id && a !== c) {
                  tempArray.splice(c, 1)
                  if (a >= tempArray.length) {
                    break
                  }
                }
              }
            }
          //  _.uniqWith(tempArray, function(newValue, oldValue) {
          //    console.log(newValue.id === oldValue.id)
          //      return newValue.id === oldValue.id
          //   })

            this.jobDataList = tempArray
            // 根据获取的数据条数判断下次应该加载多少条数据
            // if (res.data.length < this.pageSize && this.serviceDataList.length < this.pageSize) {
            //   this.pageSize = 0
            // } else if (res.data.length < this.pageSize || this.serviceDataList.length < this.pageSize) {
            //   this.pageSize = 10
            // }
            // 如果获取的总数据小于10条就关闭加载显示
            if (this.serviceDataList.length + res.data.length < 10000) {
              this.showScrollerLoading = false
            }
            if (this.r1 === '全部类型') {
              // 拼接数据
              this.list = this.list.concat(this.serviceDataList.concat(this.jobDataList))
            } else if (this.r1 === '服务质量评价') {
              this.list = this.serviceDataList
            } else if (this.r1 === '工作完成评价') {
              this.list = this.jobDataList
            }
            console.log(347, this.list)
            if (this.list.length === 0) {
              this.noData = true
            } else {
              this.noData = false
            }
          })
        })
      },
      // 跳转页面方法
      goTo(id, type, status, list) {
        // 判断类型是服务质量还是工作完成度
        if (type === 1 && status < 2) {
          // 如果是服务质量且状态是未读就跳转到服务质量评价页
          list.name = list.title
          localStorage.setItem('needBadCommentPeopleList', JSON.stringify([list]))
          console.log(list)
          this.$router.push({
            name: 'serveComment',
            params: {
              id: id
            }})
          return false
        }
        if (type === 0 && status === 0) {
          // 如果是工作完成度且状态是未读就跳转到工作完成度评价页
          console.log(list)
          localStorage.setItem('currentTask', JSON.stringify(list))
          this.$router.push({
            name: 'completeComment',
            params: {
              id: id
            }})
          return false
        }
        // 如果是已提交或者过期的就跳转到评价结果页
        this.$router.push({
          name: 'evaluationRecordDetail',
          params: {
            id: id,
            type: type
          }
        })
      }
    },
    watch: {
      r1: function() {
        this.closeRadioWindow()
        this.evaluationType()
      },
      r2: function() {
        this.closeRadioWindow()
        this.watchEvaluationType()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component o
nly -->
<style>
.evaluationRecord {
  overflow: hidden;
}
.evaluationRecord .vux-no-group-title{
 margin-top: 0px;
}
.evaluationRecord .weui-cell:before{
  border: none;
}
.evaluationRecord .weui-cell{
  border-bottom: 1px solid #eee;
}
.evaluationRecord h1,
.evaluationRecord h2 {
  font-weight: normal;
}
.evaluationRecord ul {
  list-style-type: none;
  padding: 0;
}
.evaluationRecord li {
  display: inline-block;
  margin: 0 10px;
}
.evaluationRecord a {
  color: #42b983;
}
.evaluationRecord .sub-item {
  color: #888;
}
.evaluationRecord .slide {
  padding: 0 20px;
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.5s cubic-bezier(0, 1, 0, 1) -0.1s;
}
.evaluationRecord .mask {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  z-index: 100;
}
@import '~vux/src/styles/1px.less';
.evaluationRecord .flex-demo {
  width: 33;
  text-align: center;
  color: #333;
  /* background-color: rgba(242, 242, 242, 1); */
  border-radius: 4px;
  background-clip: padding-box;
}
.evaluationRecord .weui-panel {
  margin-top: 0;
  font-family: 'PingFangSC-Medium';
}
.evaluationRecord .weui-toast.weui-toast_text {
  border-radius: 20px;
}
</style>
