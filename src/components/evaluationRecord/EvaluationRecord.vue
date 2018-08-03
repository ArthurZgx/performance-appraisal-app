<template>
  <div>

    <div class="vux-demo">
      <!--<img class="logo" src="../../assets/vux_logo.png">-->
      <!--<h3>考评记录</h3>-->
      <x-header :right-options="{showMore: true}"
                style="box-shadow:none;"
                @on-click-more="showMenus = true">
                考评记录
      </x-header>
    </div>
    <!--<group>-->
    <!--<cell title="考评记录" value="..." is-link link="/personal"></cell>-->
    <!--</group>-->

    <flexbox style="background:#F0EFF5;font-size:13px;">
      <flexbox-item><div class="flex-demo">
        <cell
          :title="('考评类型')"
          is-link
          :border-intent="false"
          :arrow-direction="kaoping ? 'up' : 'down'"
          @click.native="kaoping = !kaoping,chakan = false,riqi = false" ></cell>
        <!-- <template v-if="kaoping">
          <cell-box :border-intent="false" class="sub-item">全部类型</cell-box>
          <cell-box :border-intent="false" class="sub-item">服务质量评价</cell-box>
          <cell-box :border-intent="false" class="sub-item">工作完成评价</cell-box>
        </template> -->
      </div></flexbox-item>
      <flexbox-item v-if="!(pageType === 'alreadySubmit')">
      <div class="flex-demo">
        <cell
          :title="('查看类型')"
          is-link
          :border-intent="false"
          :arrow-direction="chakan ? 'up' : 'down'"
          @click.native="chakan = !chakan,kaoping = false, riqi = false" ></cell>

        <!-- <template v-if="chakan">
          <cell-box :border-intent="false" class="sub-item">全部</cell-box>
          <cell-box :border-intent="false" class="sub-item">已查看类型</cell-box>
          <cell-box :border-intent="false" class="sub-item">未查看类型</cell-box>
        </template> -->
      </div></flexbox-item>
      <flexbox-item><div class="flex-demo">


        <cell
          :title="('日期')"
          is-link
          :border-intent="false"
          :arrow-direction="riqi ? 'up' : 'down'"
          @click.native="riqi = !riqi,kaoping = false,chakan = false" ></cell>

        <!-- <template v-if="riqi">
          <cell-box :border-intent="false" class="sub-item">2018年6月</cell-box>
          <cell-box :border-intent="false" class="sub-item">2018年5月</cell-box>
          <cell-box :border-intent="false" class="sub-item">2018年4月</cell-box>
        </template> -->
      </div></flexbox-item>
    </flexbox>
    <!-- 判断点击菜单类型,显示选择栏 -->
    <!-- 显示考评类型 -->
    <group v-show="kaoping" style="margin-top:-1.2em;">
      <radio v-model="r1" :options="radio001" :selected-label-style="{color:'#3891F0'}"></radio>
    </group>
    <!-- 显示查看类型 -->
    <group v-show="chakan" style="margin-top:-1.2em;">
      <radio v-model="r2" :options="radio002" :selected-label-style="{color:'#3891F0'}"></radio>
    </group>
    <group v-show="riqi" style="margin-top:-1.2em;">
      <!-- <flexbox> -->
        <!-- 显示年份 -->
        <!-- <flexbox orient="vertical" :gutter="0">
          <flexbox-item  v-for="(item,index) in years" :key="index">
            <cell :title="item+'年'" is-link :style="selectedYearIndex==index?'color:#3891F0;':''"  @click.native="selectedYearIndex=index"></cell>
          </flexbox-item>         
        </flexbox> -->
        <!-- 显示月份 -->
          <!-- <flexbox orient="vertical" :style="'height:'+years.length*44+'px;overflow:scroll;background:#eee;'" :gutter="0">
          <flexbox-item  v-for="(item,index) in month" :key="index">
            <cell :title="item+'月'" :style="selectedMouthIndex==index?'color:#3891F0;':''" @click.native="selectedMouth(index)"></cell>
          </flexbox-item>         
        </flexbox>
      </flexbox> -->
  <inline-calendar
  ref="calendar"
  @on-change="onDateChange"
  class="inline-calendar-demo"
  v-model="selectedData"
  >
  </inline-calendar>
    </group>
    <!-- 选中菜单栏设置半透明蒙版 -->
    <div class="mask" v-if="riqi||chakan||kaoping" @click="riqi=false,chakan = false, kaoping = false"></div>

    <!-- 显示考评信息 -->
    <!-- <panel :header="('')" :list="list" :type="type" @on-img-error="onImgError"></panel> -->
    <group>
      <cell v-for="(item,index) in list" :key="index" :title="item.title" :inline-desc="'评价日期:'+item.date" 
      @click.native="goTo(item.id,item.type,item.status)"></cell>
    </group>
  </div>
</template>

<script>
  import { Group, Flexbox, FlexboxItem, CellBox, Cell, Panel, XHeader, Radio, InlineCalendar } from 'vux'
  import request from '../../../src/utils/request.js'

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
      InlineCalendar
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
        years: ['2018', '2017', '2016', '2015'],
        month: ['8', '7', '6', '5', '4', '3'],
        selectedYearIndex: 0,
        selectedMouthIndex: 0,
        type: '2',
        selectedData: '2018-08-01',
        list: [],
        serviceDataList: [],
        jobDataList: [],
        selectedOptionType: '',
        pageType: '',
        tempDataList: []
      }
    },
    mounted() {
      // this.list.push(JSON.parse(localStorage.getItem('serveList')))
      // _.each(this.list, function(item, key) {
      //   item.title = item.name
      //   item.desc = item.time
      // })
      // console.log(this.list)
      this.pageType = this.$route.params.type || localStorage.getItem('selectedOptionType')
      if (this.$route.params.type) {
        localStorage.setItem('selectedOptionType', this.$route.params.type)
      }
      var type = this.$route.params.type || localStorage.getItem('selectedOptionType')
      switch (type) {
        // 如果是已提交
        case 'alreadySubmit':
          this.getDatas(2, 2)
          break
          // 如果是已过期
        case 'pastSubmit':
          this.getDatas(3, 3)
          break
          // 如果是未提交
        case 'inSubmit':
          this.getDatas(2, 2, 'lessThan')
          break
      }
      // request('main_job_service_evaluations').then(res => {
      //   this.allDataList = res.data
      //   this.list = res.data
      // })
    },
    methods: {
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
        // var year = this.years[this.selectedYearIndex]
        // var mouth = this.month[this.selectedMouthIndex]
        // var tempArray = []
        // for(var i = 0, len = this.list.length; i < len; i++) {
        //   console.log('i')
        // }
      },
      onDateChange() {
        this.riqi = false
      },
      // 类型筛选
      evaluationType() {
        console.log(this.r1)
        switch (this.r1) {
          case '全部类型':
            this.list = this.serviceDataList.concat(this.jobDataList)
            break
          case '服务质量评价':
            this.list = this.serviceDataList
            break
          case '工作完成评价':
            this.list = this.jobDataList
            break
        }
      },
      // 是否查看筛选
      watchEvaluationType() {
        this.list = this.serviceDataList.concat(this.jobDataList)
        var tempDataList = []
        switch (this.r2) {
          case '全部':
            break
          case '已查看通知':
            tempDataList = []
            console.log(this.list)
            for (var i = 0, len = this.list.length; i < len; i++) {
              if (this.list[i].status !== 0) {
                tempDataList.push(this.list[i])
              }
              console.log(tempDataList)
            }
            this.list = tempDataList
            break
          case '未查看通知':
            tempDataList = []
            for (i = 0, len = this.list.length; i < len; i++) {
              if (this.list[i].status === 0) {
                tempDataList.push(this.list[i])
              }
            }
            this.list = tempDataList
            break
        }
      },
      // 根据日期筛选
      selectedDateChange() {
        this.list = this.serviceDataList.concat(this.jobDataList)
        var tempDataList = []
        for (var i = 0, len = this.list.length; i < len; i++) {
          console.log(this.list[i].date)
          console.log(this.selectedData)
          console.log(this.list[i].date === this.selectedData)
          if (this.list[i].date === this.selectedData) {
            tempDataList.push(this.list[i])
          }
        }
        this.list = tempDataList
      },
      // 获取数据
      getDatas(param1, param2, type) {
        var userId = localStorage.getItem('userId')
        if (type === undefined) {
          type = 'equalTo'
        }
        // 设置过滤器
        var filter = "{'main_service_detail':{'status':{" + type + ":'" + param1 + "'},'user_id':{equalTo:'" + userId + "'}}}"
        var includes = "{'main_job_service_evaluation':{includes:['main_job_service_evaluation_id']}}"
        // 请求数据
        request('main_service_details', {
          params: { filters: filter, includes: includes }
        }).then(res => {
          var tempArray = []
          for (var i = 0, len = res.data.length; i < len; i++) {
            tempArray.push({
              title: res.data[i].includes.main_job_service_evaluation.title,
              date: res.data[i].includes.main_job_service_evaluation.evaluationTime.split(' ')[0],
              type: res.data[i].includes.main_job_service_evaluation.type,
              status: res.data[i].superior.status,
              id: res.data[i].includes.main_job_service_evaluation.id
            })
          }
          this.serviceDataList = tempArray
          // 更改过滤条件
          filter = "{'main_job_detail':{'status':{" + type + ":'" + param2 + "'},'user_id':{equalTo:'" + userId + "'}}}"
          // 再次请求数据
          request('main_job_details', {
            params: { filters: filter, includes: includes }
          }).then(res => {
            tempArray = []
            for (var i = 0, len = res.data.length; i < len; i++) {
              tempArray.push({
                title: res.data[i].includes.main_job_service_evaluation.title,
                date: res.data[i].superior.year + '-' + res.data[i].superior.month,
                type: res.data[i].includes.main_job_service_evaluation.type,
                status: res.data[i].superior.status,
                id: res.data[i].includes.main_job_service_evaluation.id
              })
            }
            for (var a = 0, b = tempArray.length - 1; a < b; a++) {
              for (var c = 1, d = tempArray.length; c < d; c++) {
                if (tempArray[a].title === tempArray[c].title && tempArray[a].id === tempArray[c].id) {
                  tempArray.splice(c, 1)
                }
              }
            }
            this.jobDataList = tempArray
            this.list = this.serviceDataList.concat(this.jobDataList)
          })
        })
      },
      // 跳转页面方法
      goTo(id, type, status) {
        // 判断类型是服务质量还是工作完成度
        if (type === 1 && status === 0) {
          // 如果是服务质量且状态是未读就跳转到服务质量评价页
          this.$router.push({
            name: 'serveComment',
            params: {
              id: id
            }})
          return false
        }
        if (type === 0 && status === 0) {
          // 如果是工作完成度且状态是未读就跳转到工作完成度评价页
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
      },
      selectedData: function() {
        this.closeRadioWindow()
        this.selectedDateChange()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component o
nly -->
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
.sub-item {
  color: #888;
}
.slide {
  padding: 0 20px;
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.5s cubic-bezier(0, 1, 0, 1) -0.1s;
}
.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  z-index: 100;
}
@import '~vux/src/styles/1px.less';
.flex-demo {
  width: 33;
  text-align: center;
  color: #333;
  /* background-color: rgba(242, 242, 242, 1); */
  border-radius: 4px;
  background-clip: padding-box;
}
.weui-panel {
  margin-top: 0;
  font-family: 'PingFangSC-Medium';
}
</style>
