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
                 :options="['张三的服务质量评价']"
                 v-model="checklist1"
                 @on-change="checkChange">
      </checklist>
      <checklist title="法务部"
                 :label-position="'right'"
                 :options="['李四的服务质量评价']"
                 v-model="checklist1"
                 @on-change="checkChange">
      </checklist>
      <checklist title="市场部"
                 :label-position="'right'"
                 :options="['王五的服务质量评价']"
                 v-model="checklist1"
                 @on-change="checkChange">
      </checklist>
    </group>
  </div>
</template>

<script>
import { Group, Cell, Tabbar, TabbarItem, XHeader, Icon, Search, Checklist } from 'vux'

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
    Checklist
  },
  data() {
    return {
      results: [], // 搜索结果列表
      searchValue: '', // 搜索绑定的数据
      checklist1: [] // 选择列表
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
    checkChange() {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .weui-search-bar__cancel-btn{
    display: block;
  }
</style>
