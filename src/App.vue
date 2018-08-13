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
</style>
