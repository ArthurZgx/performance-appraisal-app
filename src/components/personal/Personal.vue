<template>
  <div>
    <div class="vux-demo">
      <x-header :right-options="{showMore: false}"
                :left-options="{showBack: false}"
                @on-click-more="showMenus = true">
        我的
      </x-header>

      <!--<img class="logo" src="../../assets/vux_logo.png">-->
      <!--<h3>用户名</h3>-->
      <router-link to="/personalInfo">
        <div class="personal-top-content">
          <img v-if="!avatar" class="logo" src="../../assets/svg/top.svg">
          <img v-if="avatar" class="logo" :src="avatar">
          <h3 text-align="center" style="padding-top:9px;font-weight:normal;">{{userName}}</h3>
        </div>
      </router-link>
      <flexbox class="personal-nav-list">
        <flexbox-item>
          <router-link to="/evaluationType">
            <div class="a-nav-href">
              <img src="../../assets/svg/commentRecord.svg" alt="">
              <div>考评记录</div>
            </div>
          </router-link>
        </flexbox-item>
        <flexbox-item>
          <router-link to="/evaluationResult">
            <div class="a-nav-href">
              <img src="../../assets/svg/commentResults.svg" alt="">
              <div>我的考评结果</div>
            </div>
          </router-link>
        </flexbox-item>
        <flexbox-item>
          <router-link to="/userJobComplete">
            <div class="a-nav-href">
              <img src="../../assets/svg/myJobTask.svg" alt="">
              <div>我的工作任务</div>
            </div>
          </router-link>
        </flexbox-item>
      </flexbox>
    </div>
    <!-- <group>
      <cell title="考评记录" is-link link="evaluationRecord"></cell>
      <cell title="我的考评结果" is-link link="evaluationResult"></cell>
      <cell title="身份绑定" is-link link="personalInfo"></cell>
    </group> -->
    <div class="personal-center-content">

    <!--<flexbox class="personal-nav-list">-->
      <!---->
      <!--<flexbox-item>-->
        <!--<router-link to="/alreadyBound">-->
        <!--<div class="a-nav-href">-->
          <!--<img src="../../assets/TheBindingOfIdentity.png" alt="">-->
          <!--<div>身份绑定</div>-->
        <!--</div>-->
        <!--</router-link>-->
      <!--</flexbox-item>-->
    <!--</flexbox>-->

    </div>

    <tabbar style="position: fixed;">
      <!--<tabbar-item>-->
      <!--<span slot="label" @click="show1=true">个人中心</span>-->
      <!--</tabbar-item>-->
      <!--<tabbar-item>-->
      <!--<span slot="label">技能测试</span>-->
      <!--</tabbar-item>-->
      <tabbar-item link="home">
        <img slot="icon" src="../../assets/index1.png">
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item link="personal">
        <img slot="icon" src="../../assets/myself_hover.png">
        <span slot="label" style="color:#5177aa;">我的</span>
      </tabbar-item>
    </tabbar>
    <div class="bg"></div>
  </div>
</template>

<script>
  // import _ from 'lodash'
  // import moment from 'moment'
  import { Group, Cell, TabbarItem, Tabbar, XHeader, Icon, Flexbox, FlexboxItem } from 'vux'
  export default {
    name: 'personal',
    components: {
      Group,
      Cell,
      TabbarItem,
      Tabbar,
      XHeader,
      Icon,
      Flexbox,
      FlexboxItem
    },
    data() {
      return {
        // note: changing this line won't causes changes
        // with hot-reload because the reloaded component
        // preserves its current state and we are modifying
        // its initial state.
        msg: 'Hello World!',
        userName: '',
        avatar: '' // 从缓存获取的用户头像
      }
    },
    created() {
      const self = this
      self.init()
    },
    methods: {
      init() {
        this.userName = localStorage.getItem('userName')
        // this.avatar = localStorage.getItem('avatar')
        if (localStorage.getItem('avatar') && localStorage.getItem('avatar') !== null && localStorage.getItem('avatar') !== 'undefined') {
          this.avatar = localStorage.getItem('avatar')
        } else {
          this.avatar = ''
        }
        console.log('init', this.avatar)
        // const a = [1, 2, 3, 4, 5]
        // _.each(a, function(i, j) {
        //   console.log(i, j)
        // })
        // // const time = moment().format('MMMM Do YYYY, h:mm:ss a'); //七月 11日 2018, 9:36:25 上午
        // const time = moment().format('YYYY-MM-DD hh:mm:ss') // 2018-07-11 09:41:50
        // console.log(time)
      }
    }
  }
</script>

<style scoped>
.bg {
  position: fixed;
  width: 100%;
  height: 100%;
  background: #fefefe;
}
.vux-demo {
  text-align: center;
  padding-bottom: 12px;
  background: #fefefe;
}
.logo {
  width: 94px;
  height: 94px;
  border-radius: 50%;
  position: absolute;
  left: 25px;
  top: -47px;
}
/*.personal-center-content {*/
  /*width: 94%;*/
  /*margin: 10px auto;*/
  /*margin-top: 0px;*/
  /*border-radius: 5px;*/
  /*box-shadow: 2px 2px 5px 25px #fefefe;*/
/*}*/
.personal-nav-list {
  padding: 14px 0px;
  box-sizing: border-box;
  text-align: center;
  position: relative;
  width: 82%;
  margin: 0 auto;
  margin-top: -54px;
  align-items: flex-start;
}
a {
  color: black;
}
.a-nav-href {
  width: 100%;
  text-align: center;
  font-size: 18px;
  color: #030303;
}
.a-nav-href img {
  width: 64%;
  max-width: 60px;
  margin: 0 auto;
  border: 2px solid white;
  border-radius: 50%;
  box-shadow: 0 2px 4px 2px rgba(0,0,0,0.10);
}
.personal-top-content {
  width: 88%;
  height: 110px;
  margin: 10px auto;
  margin-top: 47px;
  background: white;
  position: relative;
  box-shadow: 0 2px 4px 2px rgba(0,0,0,0.10);
  border-radius: 4px;
}
</style>
