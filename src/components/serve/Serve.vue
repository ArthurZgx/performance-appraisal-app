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
    <group class="home_group groupList">
      <div v-for="(item,index) in serveList" :key="index">
        <div class="serveClassifyTitle">{{item.title}}</div>
        <div>
           <div v-for="(list,index) in item.list" :key="index" class="aListData">
            <div class="listCheck"  @click="listCheckClick(list)">
              <check-icon :value.sync="list.checked"></check-icon>
            </div>
            <div class="listInfo" @click="goToServeComment(list)">
                <div>{{list.name}}</div>
                <div>{{list.time}}</div>
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
            <check-icon :value.sync="checkedAll"></check-icon>全选
          </div>
        </flexbox-item>
        <flexbox-item>
          <x-button type="primary">一键提交</x-button>
        </flexbox-item>
      </flexbox>
    </sticky>
  </div>
</template>

<script>
import { Group, Cell, Tabbar, TabbarItem, XHeader, Icon, Search, CheckIcon, XButton, Flexbox, FlexboxItem, Sticky } from 'vux'
// import _ from 'lodash'

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
    FlexboxItem
  },
  data() {
    return {
      results: [], // 搜索结果列表
      searchValue: '', // 搜索绑定的数据
      checklist1: [], // 选择列表
      commonList: ['name1', 'name2', 'name3', 'name4'], // 所有供选择的列表
      checkedAll: false, // 是否全选
      childNodeNum: 0,
      serveList: [
        {
          title: '技术部',
          list: [
            { name: '张三服务质量评价', time: '2018-08-08', checked: false },
            { name: '刘备服务质量评价', time: '2018-08-08', checked: false }
          ]
        },
        {
          title: '法务部',
          list: [{ name: '李四服务质量评价', time: '2018-08-08', checked: false }]
        },
        {
          title: '宣传部',
          list: [{ name: '王五服务质量评价', time: '2018-08-08', checked: false }]
        },
        {
          title: '外交部',
          list: [{ name: '赵六服务质量评价', time: '2018-08-08', checked: false }]
        }
      ]
    }
  },
  watch: {
    checkedAll(newValue, oldValue) {
      console.log('改变了', '旧', oldValue)
      console.log('改变了', '新', newValue)
    }
  },
  methods: {
    searchFocus() {},
    searchCancel() {},
    resultClick() {},
    searchSubmit() {},
    searchChange() {},
    clickList() {},
    // 跳转评价详情
    goToServeComment(list) {
      localStorage.setItem('serveList', JSON.stringify(list))
      console.log(list)
      this.$router.push({ path: 'ServeComment' })
    },
    // 选中当前数据
    listCheckClick(list) {
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
      } else if (this.checkedAll === true) {
        this.checkAll = false
        for (j = 0; j < this.serveList.length; j++) {
          for (i = 0, len = this.serveList[j].list.length; i < len; i++) {
            this.serveList[j].list[i].checked = true
          }
        }
      }
    }
  },
  mounted() {
    for (i = 0; i < this.serveList.length; i++) {
      for (j = 0, len = this.serveList[i].list.length; j < len; j++) {
        this.childNodeNum++
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
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
}
.listCheck {
  height: 50px;
  line-height: 50px;
}
.listInfo {
  height: 50px;
  margin-left: 30px;
}
</style>
