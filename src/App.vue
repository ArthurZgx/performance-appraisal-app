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
  width: 12px !important;
  height: 12px !important;
  border: 1px solid #5177aa !important;
  border-width: 3px 0 0 3px !important;
}
.weui-search-bar{
  background-color: white !important;
}
/*搜索框上下线*/
.weui-search-bar:before{
  display: none;
}
.weui-search-bar:after{
  display: none;
}
/*搜索框背景*/
.weui-search-bar__label{
  background: rgba(142,143,143,0.12) !important;
}
.weui-search-bar__label .weui-icon-search{
  display: none;
}
.weui-search-bar__label span{
  float: left;
  margin-left: 30px;
  margin-top: 6px;
}
.weui-search-bar__box .weui-search-bar__input{
  width: 100% !important;
  height: 29px !important;
}
.weui-search-bar__box .weui-icon-search{
  top: 5px !important;
}
.weui-search-bar.weui-search-bar_focusing .weui-search-bar__cancel-btn{
  margin-top: 5px;
}
.weui-icon-clear:before{
  margin-top: 5px;
}
.weui-cells:before{
  border-top: 1px solid white !important;
}
.weui-search-bar__label{
  border-radius: 10px !important;
}
.weui-search-bar__form{
  background: white !important;
}
.weui-search-bar__form:after{
  /*border: none !important;*/
  border-radius: 20px !important;
  left: 1px !important;
  top: 1px !important;
  width: 199% !important;
  height: 189% !important;
}
</style>
