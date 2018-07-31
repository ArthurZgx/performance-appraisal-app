<template>
  <div>
    <div class="vux-demo">
      <x-header :right-options="{showMore: true}"
                style="box-shadow: 0 2px 10px 0 rgba(0,0,0,0.10);margin-bottom: 15px;"
                @on-click-more="showMenus = true">
                个人信息
      </x-header>
      <img class="logo" src="../../assets/vux_logo.png">
      <h3>个人信息页</h3>
    </div>
    <!--<group title="cell demo">-->
      <!--<cell title="返回首页" value="cool" is-link link="/personal"></cell>-->
    <!--</group>-->
    <div>
      <group title="" label-width="5.5em" label-margin-right="2em">
        <cell title="名字"  :value="value1" is-link value-align="left" @click.native="showEditNameConfirm = true"></cell>
        <cell title="账号"  value="value" is-link value-align="left" ></cell>
        <!--<x-input title="上报人" v-model="value1"></x-input>-->
        <!--<x-number title="Quantity" align="left" v-model="numberValue" button-style="round" :min="0" :max="5"></x-number>-->
        <datetime title="时间" v-model="time1" value-text-align="left"></datetime>
        <!--<selector title="类别" :options="['工艺技术', '其他']" v-model="value2"></selector>-->
        <!--<popup-picker title="请选择" :data="list" v-model="value5" value-text-align="left"></popup-picker>-->
        <x-address title="地址选择" v-model="addressValue" raw-value :list="addressData" value-text-align="left" label-align="justify"></x-address>
        <!--<x-switch title="选择"></x-switch>-->
        <x-textarea title="详细信息" placeholder="请填写详细信息" :show-counter="false" :rows="3"></x-textarea>
      </group>
      <br>
    </div>
  <!-- 修改姓名 -->
    <confirm v-model="showEditNameConfirm"
      show-input
      ref="confirm5"
      title="修改姓名"
      @on-confirm="onCancelEditNameConfirm"
      @on-show="onShowEditNameConfirm">
    </confirm>
  </div>

</template>

<script>
  import { Group, Cell, XHeader, GroupTitle, XInput, Selector, PopupPicker, XAddress, Datetime, XNumber, XTextarea, XSwitch, Confirm } from 'vux'

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
    methods: {
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
</style>
