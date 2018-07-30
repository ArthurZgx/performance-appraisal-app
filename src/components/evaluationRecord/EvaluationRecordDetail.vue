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
    <group>
      <cell title="返回首页" value="cool" is-link link="/personal"></cell>
    </group>
    <form-preview :header-label="('张三03月服务质量评价')"  :body-items="list" ></form-preview>
    <br>
   </div>
</template>
<script>
  import { FormPreview, XHeader, Icon, Group, Cell } from 'vux'
  export default {
    name: 'personal',
    components: {
      FormPreview,
      XHeader,
      Icon,
      Group,
      Cell
    },
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        list: [{
          label: '我的票数',
          value: '10'
        }, {
          label: '好评论数',
          value: '3'
        }, {
          label: '差评数',
          value: '3'
        }, {
          label: '差评说明',
          value: '很长很长的名字很长很长的名字很长很长的名字很长很长的名字很长很长的名字'
        }]
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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
  border-bottom: 1px dashed #f11;
}
a {
  color: #42b983;
}
</style>
