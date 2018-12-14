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
  box-shadow: 0 2px 7px 0 rgba(0, 0, 0, 0.1);
}
/* 客户最新样式更改 */
/*更改标题栏*/
.vux-header-title-area, .vux-header .vux-header-title{
  font-size: 24px !important;
  font-weight: bold !important;
}
/*搜索框默认取消按钮  */
.weui-search-bar__cancel-btn{
  display: none;
}
</style>
