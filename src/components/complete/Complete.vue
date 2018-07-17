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
    <group class="home_group">
      <checklist title="技术部"
                 :label-position="'right'"
                 :options="[{key:'name1',value:'张三的工作完成度评价',inlineDesc:'2018-02-13'}]"
                 v-model="checklist1"
                 @on-change="checkChange1">
      </checklist>
      <checklist title="法务部"
                 :label-position="'right'"
                 :options="[{key:'name2',value:'李四的工作完成度评价',inlineDesc:'2018-02-13'}]"
                 v-model="checklist1"
                 @on-change="checkChange2">
      </checklist>
      <checklist title="市场部"
                 :label-position="'right'"
                 :options="[{key:'name3',value:'王五的工作完成度评价',inlineDesc:'2018-02-13'}]"
                 v-model="checklist1"
                 @on-change="checkChange3">
      </checklist>
    </group>
    <!-- 一键提交 -->
    <sticky ref="sticky"
            :offset="100"
            :check-sticky-support="false"
            disabled="disabled">
      <flexbox>
        <flexbox-item :span="3.5">
          <div @click="clickAll" class="home_div">
            <checklist :options="[{key:'name4',value:'全选',inlineDesc:''}]"
                       v-model="checklist1"
                       @on-change="checkAll">
            </checklist>
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
  import { Group, Cell, Tabbar, TabbarItem, XHeader, Icon, Search, Checklist, XButton, Flexbox, FlexboxItem, Sticky } from 'vux'
  import _ from 'lodash'

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
      Checklist,
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
        commonList: ['name1', 'name2', 'name3'] // 所有供选择的列表
      }
    },
    methods: {
      searchFocus() {

      },
      searchCancel() {

      },
      resultClick() {

      },
      searchSubmit() {

      },
      searchChange() {

      },
      // checklist 选中状态改变
      checkChange1(value, label) {
        console.log('选中状态改变1', value, label)
        console.log('选择列表', this.checklist1)
      },
      // checklist 选中状态改变
      checkChange2(value, label) {
        console.log('选中状态改变2', value, label)
      },
      // checklist 选中状态改变
      checkChange3(value, label) {
        console.log('选中状态改变3', value, label)
      },
      // 全选
      checkAll() {
        // this.checklist1 = []
      },
      // 点击全选
      clickAll() {
        console.log('点击全选')
        // const all = _.without.apply(_, [this.commonList].concat(this.checklist1))
        // this.checklist1 = all
        if (this.checklist1.length === 3) {
          this.checklist1 = []
        } else {
          this.checklist1 = this.commonList
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .weui-search-bar__cancel-btn{
    display: block;
  }
  .serve .vux-sticky-box{
    position: fixed;
    width: 100%;
    bottom: 0;
  }
</style>
