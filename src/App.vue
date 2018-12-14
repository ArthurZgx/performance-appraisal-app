<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="less">
@import '~vux/src/styles/reset.less';
#app {
  width: 100%;
  overflow: hidden;
}
body {
  background-color: #fff;
}
.vux-demo {
  text-align: center;
  z-index: 1000;
}
.vux-header {
  /*box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.1);*/
}
/* 客户最新样式更改 */
/*更改标题栏*/
.vux-header-title-area, .vux-header .vux-header-title{
  font-size: 24px !important;
  font-weight: bold !important;
}
/*隐藏返回文字*/
.vux-header-back{
  width: 0;
  overflow: hidden;
}
/*返回按钮*/
.vux-header .vux-header-left .left-arrow:before{
  width: 15px !important;
  height: 15px !important;
  border: 1px solid #5177aa !important;
  border-width: 4px 0 0 4px !important;
}
</style>
