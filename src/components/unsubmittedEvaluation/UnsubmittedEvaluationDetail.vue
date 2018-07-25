<template>
  <div>
    <div class="vux-demo">
      <x-header :right-options="{showMore: true}"
                @on-click-more="showMenus = true">
        绩效考评
      </x-header>
      <img class="logo" src="../../assets/vux_logo.png">
      <h3>考评记录</h3>

    </div>

    <group title="张三03月服务评价" label-width="5.5em" label-align="justify">

      <x-input title="我的票数" v-model="value"></x-input>
      <x-number title="好评数量" align="left" v-model="numberValue" button-style="round" :min="0" :max="5"></x-number>
      <x-number title="差评数量" align="left" v-model="numberValue" button-style="round" :min="0" :max="5"></x-number>
      <x-textarea title="详细信息" placeholder="请填写详细信息" :show-counter="false" :rows="3"></x-textarea>
    </group>

    <flexbox>
      <flexbox-item><div class="flex-demo">
        <x-button  type="primary"> 保存 </x-button>
      </div>
      </flexbox-item>

      <flexbox-item><div class="flex-demo">
        <x-button  type="primary"> 提交 </x-button>
      </div>
      </flexbox-item>

    </flexbox>

    <br>
  </div>
</template>
<script>
  import { GroupTitle, Group, Cell,FormPreview, XNumber, XTextarea, XInput, XHeader, Icon, XButton, Flexbox, FlexboxItem } from 'vux'
  export default {
    name: 'personal',
    components: {
      FormPreview,
      XHeader,
      Icon,
      XTextarea,
      XNumber,
      Cell,
      XInput,
      XButton,
      Flexbox,
      FlexboxItem
    },
    name: 'Demo2',
    data() { return {
    msg: 'Welcome to Your Vue.js App',
    value:'10',
    numberValue: 0
  }
  }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
    border-bottom:1px dashed #f11
  }
  a {
    color: #42b983;
  }

  @import '~vux/src/styles/1px.less';
  .flex-demo {
    text-align: center;
    color: #333;
    background-color: rgba(242, 242, 242, 1);
    border-radius: 4px;
    background-clip: padding-box;

  }
</style>
