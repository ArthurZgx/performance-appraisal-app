<template>
  <div>
    <div class="vux-demo">
      <img class="logo" src="../../assets/vux_logo.png">
      <h1>我的</h1>
    </div>
    <group title="cell demo">
      <cell title="个人信息页" value="cool" is-link link="personalInfo"></cell>
      <cell title="考评记录" value="cool" is-link link="evaluationRecord"></cell>
      <cell title="我的考评结果" value="cool" is-link link="evaluationResult"></cell>
    </group>
    <tabbar style="position: fixed !important;z-index: 500">
      <!--<tabbar-item>-->
      <!--<span slot="label" @click="show1=true">个人中心</span>-->
      <!--</tabbar-item>-->
      <!--<tabbar-item>-->
      <!--<span slot="label">技能测试</span>-->
      <!--</tabbar-item>-->
      <tabbar-item link="home">
        <!--<img slot="icon">-->
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item link="personal" selected>
        <!--<img slot="icon">-->
        <span slot="label">我的</span>
      </tabbar-item>
    </tabbar>
  </div>
</template>

<script>
  import _ from 'lodash'
  import moment from 'moment'
  import { Group, Cell, TabbarItem, Tabbar } from 'vux'

  export default {
    components: {
      Group,
      Cell,
      TabbarItem,
      Tabbar
    },
    data () {
      return {
        // note: changing this line won't causes changes
        // with hot-reload because the reloaded component
        // preserves its current state and we are modifying
        // its initial state.
        msg: 'Hello World!'
      }
    },
    created () {
      const self = this
      self.init()
    },
    methods: {
      init () {
        console.log('init')
        const a = [ 1, 2, 3, 4, 5 ]
        _.each(a, function (i, j) {
          console.log(i, j)
        })
        // const time = moment().format('MMMM Do YYYY, h:mm:ss a'); // 七月 11日 2018, 9:36:25 上午
        const time = moment().format('YYYY-MM-DD hh:mm:ss') // 2018-07-11 09:41:50
        console.log(time)
      }
    }
  }
</script>

<style>
  .vux-demo {
    text-align: center;
  }
  .logo {
    width: 100px;
    height: 100px
  }
</style>
