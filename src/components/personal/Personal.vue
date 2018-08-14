<template>
  <div>
    <div class="vux-demo">
      <x-header :right-options="{showMore: false}"
                style="box-shadow: 0 2px 10px 0 rgba(0,0,0,0.10);margin-bottom: 15px;"
                :left-options="{showBack: false}"
                @on-click-more="showMenus = true">
        绩效考评
      </x-header>

      <!--<img class="logo" src="../../assets/vux_logo.png">-->
      <!--<h3>用户名</h3>-->
      <router-link to="/personalInfo">
        <div class="personal-top-content">
          <img v-if="!avatar" class="logo" src="../../assets/top.png">
          <img v-if="avatar" class="logo" :src="avatar">
          <h3 text-align="center">{{userName}}</h3>
        </div>
      </router-link>
    </div>
    <!-- <group>
      <cell title="考评记录" is-link link="evaluationRecord"></cell>
      <cell title="我的考评结果" is-link link="evaluationResult"></cell>
      <cell title="身份绑定" is-link link="personalInfo"></cell>
    </group> -->
    <div class="personal-center-content">
    <flexbox class="personal-nav-list">
      <flexbox-item>
        <router-link to="/evaluationType">
        <div class="a-nav-href">
          <img src="../../assets/AssessmentRecords.png" alt="">
          <div>考评记录</div>
        </div>
        </router-link>
      </flexbox-item>
      <flexbox-item>
        <router-link to="/evaluationResult">
        <div class="a-nav-href">
          <img src="../../assets/MyAssessmentResults.png" alt="">
          <div>我的考评结果</div>
        </div>
        </router-link>
      </flexbox-item>
      <flexbox-item>
        <router-link to="/userJobComplete">
          <div class="a-nav-href">
            <img src="../../assets/job.png" alt="">
            <div>我的工作任务</div>
          </div>
        </router-link>
      </flexbox-item>
    </flexbox>
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
        <img slot="icon" src="../../assets/index_onclick.png">
        <span slot="label">首页</span>
      </tabbar-item>
      <tabbar-item link="personal">
        <img slot="icon" src="../../assets/user_clicked.png">
        <span slot="label" style="color:#3891F0;">我的</span>
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
  background: #fafafa;
}
.vux-demo {
  text-align: center;
  padding-bottom: 12px;
  background: #fafafa;
}
.logo {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
.personal-center-content {
  width: 94%;
  margin: 10px auto;
  margin-top: 0;
  border-radius: 5px;
  box-shadow: 2px 2px 5px 25px #fafafa;
}
.personal-nav-list {
  padding: 20px 0px;
  box-sizing: border-box;
  text-align: center;
}
a {
  color: black;
}
.a-nav-href {
  width: 100%;
  text-align: center;
  font-size: 14px;
}
.a-nav-href img {
  width: 25%;
  max-width: 60px;
  margin: 0 auto;
}
.personal-top-content {
  width: 94%;
  margin: 10px auto;
  border-radius: 12px;
  background: white;
  padding: 20px 0;
}
</style>
