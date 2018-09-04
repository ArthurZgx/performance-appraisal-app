<template>
  <div class="home">
    <x-header :right-options="{showMore: false}"
              :left-options="{showBack: false}"
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
    <tabbar style="position: fixed;">
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
    <alert v-model="showNotLogin" title="信息错误" @on-hide="onHideNotLoginAlert">{{ msg }}</alert>
  </div>
</template>

<script>
  // import _ from 'lodash'
  // import moment from 'moment'
  import request from '@/utils/request'
  import { isEmptyObject } from '@/utils'
  import { Group, Cell, Tabbar, TabbarItem, XHeader, Icon, Alert } from 'vux'

  export default {
    name: 'home',
    components: {
      Group,
      Cell,
      Tabbar,
      XHeader,
      TabbarItem,
      Icon,
      Alert
    },
    data() {
      return {
        // note: changing this line won't causes changes
        // with hot-reload because the reloaded component
        // preserves its current state and we are modifying
        // its initial state.
        msg: '没有找到该用户信息!',
        showNotLogin: false
      }
    },
    created() {
      this.init()
      this.getUserInfo()
      // localStorage.setItem('serve', 'true')
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
        console.log('获取用户信息')
        let code = ''
        // 获取URL中参数code
        let url = window.location.href // 线上部署
        // let url = 'http://kaoping.trustfar.cn/app/?code=qlpJcZ_uLxDsdhJbVZN2ynsYfkWyw8DlVX0xIM6d9ZI&state=1#/home' // 本地测试用
        if (url.indexOf('code') > 0) {
          url = url.split('?')[1]
          url = url.split('&')[0]
          code = url.split('=')[1]
          request('extends/wechartLogin', {
            params: { code: code }
          }).then(res => {
            debugger
            console.log('用户信息', res)
            if (res.data.code === 0 && !isEmptyObject(res.data.fields)) {
              const userId = res.data.fields.id
              const name = res.data.fields.name
              const avatar = res.data.fields.workscope
              localStorage.setItem('avatar', avatar)
              // 将用户信息存入localStorage
              localStorage.setItem('userId', userId)
              localStorage.setItem('userName', name)
              // this.msg = userId + ':' + name
              // this.showNotLogin = true
              // console.log('获取缓存', localStorage.getItem('userId'))
            } else if (res.data.code !== 0) {
              console.log('没有发现该用户信息')
              this.msg = res
              // this.showNotLogin = true
            }
          }).catch(err => {
            console.log('出错了', err)
          })
        } else {
          this.msg = '没有用户信息!'
          // this.showNotLogin = true
        }
        // else {
        //   localStorage.setItem('userId', '-1062673909925590171')
        //   localStorage.setItem('userName', '刘婧')
        // }
        // console.log('code', code)
      },
      onHideNotLoginAlert() {
        console.log('关闭窗口')
        window.opener = null
        // JS重写当前页面
        window.open('', '_self', '')
        window.close()
        this.showNotLogin = true
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
