<template>
  <div class="serve">
    <x-header :right-options="{showMore: true}"
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
                  <inline-x-number v-model="list.goodCommentNumber" style="display:block;" :min="0" :max="5" width="50px" button-style="round"></inline-x-number>
                </div>
                
                <!-- <div class="listInfoTime">{{list.time}}</div> -->
            </div>
           </div>
        </div>
      </div>
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
import { Group, Cell, Tabbar, TabbarItem, XHeader, Icon, Search, CheckIcon, XButton, Flexbox, FlexboxItem, Sticky, XDialog, Toast, InlineXNumber } from 'vux'
// import _ from 'lodash'
import request from '@/utils/request'
// import request from '@/utils/request'

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
    InlineXNumber
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
      serveList: [
        {
          title: '技术部',
          list: [ // status 0 未评价 1 已评价 2 已过期
            { name: '张三', time: '2018-08-08', checked: false, status: '0', type: '1', goodCommentNumber: 0 },
            { name: '刘备', time: '2018-08-08', checked: false, status: '0', type: '1', goodCommentNumber: 0 }
          ]
        },
        {
          title: '法务部',
          list: [{ name: '李四', time: '2018-08-08', checked: false, status: '0', type: '1', goodCommentNumber: 3 }]
        },
        {
          title: '宣传部',
          list: [{ name: '王五', time: '2018-08-08', checked: false, status: '0', type: '1', goodCommentNumber: 0 }]
        },
        {
          title: '外交部',
          list: [{ name: '赵六', time: '2018-08-08', checked: false, status: '0', type: '1', goodCommentNumber: 0 }]
        }
      ]
    }
  },
  created() {
    this.getTotalLength()
    request('main_job_service_evaluations').then(res => {
      console.log(138, res)
    })
  },
  watch: {
    // checkedAll(newValue, oldValue) {
    //   console.log('改变了', '旧', oldValue)
    //   console.log('改变了', '新', newValue)
    // }
    searchValue() {
      console.log('搜索')
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
    searchCancel() {},
    resultClick() {},
    searchSubmit() {},
    searchChange() {},
    clickList() {},
    // 跳转评价详情
    goToServeComment(list) {
      // if (localStorage.getItem('serveList')) {
      //   const temp = JSON.parse(localStorage.getItem('serveList'))
      // }
      localStorage.setItem('needBadCommentPeopleList', JSON.stringify([list]))
      console.log(list)
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
            console.log(this.checklist1[i])
            this.checklist1.splice(i, 1)
            console.log(i)
          }
        }
      }
    },
    // 确认一键提交按钮被点击
    affirmSubmit() {
      this.showSubmitDialog = false
      this.showSubmitToast = true
      var tempArray = []
      for (var i = 0, len = this.checklist1.length; i < len; i++) {
        if (this.checklist1[i].goodCommentNumber !== 5) {
          tempArray.push(this.checklist1[i])
        }
      }
      localStorage.setItem('needBadCommentPeopleList', JSON.stringify(tempArray))
      this.$router.push({ name: 'serveComment' })
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
<style scoped>
.weui-search-bar__cancel-btn {
  display: block;
}
.serve .vux-sticky-box {
  position: fixed;
  width: 100%;
  bottom: 0;
}
.groupList {
  padding-bottom: 50px;
}
.aListData {
  display: flex;
  flex-direction: row;
  padding: 10px 0;
}
.serveClassifyTitle {
  padding: 10px 5px;
  border-bottom: 1px solid #eee;
  color: #666;
  font-size: 14px;
}
.listCheck {
  height: 30px;
  line-height: 30px;
}
.aListData{
  height: 30px;
  position: relative;
}
.listInfo {
  height: 30px;
  margin-left: 10px;
  line-height: 30px;
  display: flex;
  flex-direction: row;
}
.listInfoName {
  font-size: 16px;
  color: #333;
  display: inline-block;
  width: 130px;
}
.good-comment-number{
  margin-left: 0px;
  position: absolute;
  right: 0;
  top: 10px;
}
.listInfo .vux-inline-x-number{
  float: right;
  margin-top: 0px;
  margin-left: 20px;
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
  margin-top: 5px;
}
.my-check-icon-clicked {
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
</style>
