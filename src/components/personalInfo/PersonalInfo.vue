<template>
  <div>
    <div class="vux-demo">
      <x-header :right-options="{showMore: false}"
                style="box-shadow: 0 2px 10px 0 rgba(0,0,0,0.10);margin-bottom: 15px;"
                @on-click-more="showMenus = true">
                我的信息
      </x-header>
      <img v-if="userInfo.avatar==null" class="logo" src="../../assets/top.png">
      <img v-if="userInfo.avatar" class="logo" :src="userInfo.avatar">
      <!--<h3>个人信息页</h3>-->
    </div>
    <div>
      <group title="" label-width="5.5em" label-margin-right="2em">
        <cell title="姓名"  :value="userInfo.userName" value-align="left"></cell>
        <cell title="性别"  :value="userInfo.gender" value-align="left" ></cell>
        <cell title="职位"  :value="userInfo.postName" value-align="left" ></cell>
        <cell title="部门"  :value="userInfo.departmentName" value-align="left" ></cell>
        <!--<x-input title="上报人" v-model="value1"></x-input>-->
        <!--<x-number title="Quantity" align="left" v-model="numberValue" button-style="round" :min="0" :max="5"></x-number>-->
        <!--<datetime title="生日" v-model="time1" value-text-align="left"></datetime>-->
        <!--<x-textarea title="备注" placeholder="" :show-counter="false" :rows="3"></x-textarea>-->
      </group>
      <br>
    </div>
  <!-- 修改姓名 -->
    <confirm v-model="showEditNameConfirm"
      show-input
      ref="confirm5"
      title="修改昵称"
      @on-confirm="onCancelEditNameConfirm"
      @on-show="onShowEditNameConfirm">
    </confirm>
  </div>

</template>

<script>
  import { Group, Cell, XHeader, GroupTitle, XInput, Selector, PopupPicker, XAddress, Datetime, XNumber, XTextarea, XSwitch, Confirm } from 'vux'
  import request from '@/utils/request'
  import { isEmptyObject } from '@/utils'

  export default {
    name: 'Demo',
    components: {
      Group,
      Cell,
      XHeader,
      GroupTitle,
      XInput,
      Selector,
      PopupPicker,
      XAddress,
      Datetime,
      XNumber,
      XTextarea,
      XSwitch,
      Confirm
    },
    data() {
      return {
        // 用户信息
        userInfo: {
          userName: '',
          postName: '',
          departmentName: '',
          gender: '',
          avatar: ''
        },
        addressData: ['ChinaAddressData'],
        addressValue: ['广东省', '深圳市', '南山区'],
        value1: '张三',
        value2: '工艺技术',
        value3: '',
        value7: '',
        value8: '',
        value4: '',
        time1: '2017-06-01',
        value5: ['A'],
        value6: [],
        list: [['A', 'B', 'C']],
        numberValue: 0,
        showEditNameConfirm: false
      }
    },
    created() {
      this.userInfo.avatar = localStorage.getItem('avatar')
      this.getUserInfo()
    },
    methods: {
      getUserInfo() {
        const userId = localStorage.getItem('userId')
        const self = this
        if (userId) {
          request('hm_personnels/' + userId, {
            headers: {
              'X-Auth-Token': '7235ba9e71f7493d9d56b29401d9f47c'
            }
          }).then(res => {
            console.log('用户信息1', res.data)
            if (!isEmptyObject(res.data)) {
              self.userInfo.userName = res.data.name
              self.userInfo.postName = res.data.postName
              self.userInfo.departmentName = res.data.departmentName
              if (res.data.gender === '1') {
                self.userInfo.gender = '男'
              } else {
                self.userInfo.gender = '女'
              }
              self.$forceUpdate()
              console.log('用户信息2', self.userInfo)
            }
          })
        }
      },
      onCancelEditNameConfirm(msg) {
        this.value1 = msg
      },
      onShowEditNameConfirm() {
        this.$refs.confirm5.setInputValue(this.value1)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
/*.vux-demo{*/
/*text-align: center;*/
/*}*/
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
.logo{
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
</style>
