<template>
  <div>
    <div class="vux-demo">
      <x-header :right-options="{showMore: true}"
                @on-click-more="showMenus = true">
      </x-header>
      <img class="logo" src="../../assets/vux_logo.png">
      <h3>个人信息页</h3>
    </div>
    <!--<group title="cell demo">-->
      <!--<cell title="返回首页" value="cool" is-link link="/personal"></cell>-->
    <!--</group>-->
    <div>
      <group title="" label-width="5.5em" label-margin-right="2em" label-align="justify">
        <cell title="名字" value="value" is-link></cell>
        <cell title="账号" value="value" is-link value-align="left"></cell>
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
  </div>

</template>

<script>
  import { Group, Cell, XHeader, GroupTitle, XInput, Selector, PopupPicker, XAddress, Datetime, XNumber, XTextarea, XSwitch } from 'vux'

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
      XSwitch
    },
    data() {
      return {
        addressData: 'ChinaAddressData',
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
        numberValue: 0
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /*.vux-demo{*/
    /*text-align: center;*/
  /*}*/
  h1, h2 {
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
