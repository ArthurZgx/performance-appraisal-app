<template>
  <div class="home">
    <x-header :right-options="{showMore: true}"
              @on-click-more="showMenus = true">
      绩效考评
    </x-header>
    <group class="home_group">
      <cell title="服务质量评价通知"
            is-link link="serve">
        <!-- <icon slot="icon" type="info"></icon> -->
        <img src="../../assets/shop.png" slot="icon" style="height:40px;padding-right:10px;margin-top:5px;">
      </cell>
      <cell title="工作完成度评价通知"
            is-link link="complete">
        <!-- <icon slot="icon" type="info"></icon> -->
        <img src="../../assets/computer.png" slot="icon" style="height:40px;padding-right:10px;margin-top:5px;">

      </cell>
    </group>
    <!-- style="position: fixed !important;z-index: 500"-->
    <tabbar>
      <!--<tabbar-item>-->
      <!--<span slot="label" @click="show1=true">个人中心</span>-->
      <!--</tabbar-item>-->
      <!--<tabbar-item>-->
      <!--<span slot="label">技能测试</span>-->
      <!--</tabbar-item>-->
      <tabbar-item link="home">
        <img slot="icon" src="../../assets/index.png">
        <span slot="label" style="color:#3891F0;">首页</span>
      </tabbar-item>
      <tabbar-item link="personal">
        <img slot="icon" src="../../assets/user.png">
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
// import _ from 'lodash'
// import moment from 'moment'
import request from '@/utils/request'
import { isEmptyObject } from '@/utils'
import { Group, Cell, Tabbar, TabbarItem, XHeader, Icon } from 'vux'

export default {
  name: 'home',
  components: {
    Group,
    Cell,
    Tabbar,
    XHeader,
    TabbarItem,
    Icon
  },
  data() {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello World!'
    }
  },
  created() {
    this.init()
    this.getUserInfo()
  },
  methods: {
    init() {
      // console.log('init')
      // const a = [1, 2, 3, 4, 5]
      // _.each(a, function(i, j) {
      //   console.log(i, j)
      // })
      // const time = moment().format('MMMM Do YYYY, h:mm:ss a'); // 七月 11日 2018, 9:36:25 上午
      // const time = moment().format('YYYY-MM-DD hh:mm:ss') // 2018-07-11 09:41:50
      // console.log('地址', window.location.href)
    },
    // 获取用户信息
    getUserInfo() {
      let code = ''
      // 获取URL中参数code
      // let url = window.location.href // 线上部署用此处
      let url = 'http://yinxin.tentop.com.cn/?code=JLhoqlyitlI_404oP3rd1NZRUuNtDe2GUpLPK5z95N8&state=1234556#/home' // 本地测试用此处
      if (url.indexOf('code') > 0) {
        url = url.split('?')[1]
        url = url.split('&')[0]
        code = url.split('=')[1]
        request('extends/wechartLogin', {
          params: { code: code }
        }).then(res => {
          console.log('用户信息', res)
          if (res.data.code === 0 && !isEmptyObject(res.data.fields)) {
            const userId = res.data.fields.id
            // 将用户信息存入localStorage
            localStorage.setItem('userId', userId)
            // console.log('获取缓存', localStorage.getItem('userId'))
          }
        })
      }
      // console.log('code', code)
    }
  }
}
</script>

<style>
.home_group .vux-no-group-title {
  margin-top: 0;
}
.home_group .weui-cell {
  height: 40px;
}
.home .vux-header .vux-header-title {
  /*color: #333;*/
}
</style>
