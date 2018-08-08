<template>
  <div class="completeCommentSuccess">
    <!-- 顶部导航 -->
    <x-header style="box-shadow: 0 2px 10px 0 rgba(0,0,0,0.10);margin-bottom: 15px;"
              @on-click-more="showMenus = true"
              right-options.showMore="false">绩效考评
    </x-header>
    <!-- 提交成功图片 -->
    <div class="completeCommentSuccess_div">
      <x-img src="http://ui.haomo-tech.com/%E9%93%B6%E4%BF%A1%E9%95%BF%E8%BF%9C/assets/%E6%8F%90%E4%BA%A4%E6%88%90%E5%8A%9F.png"
             style="width:80px;height:90px"
             @on-success="imgSuccess" @on-error="imgError">
      </x-img>
    </div>
    <!-- 按钮和文字 -->
    <p style="margin-bottom: 36px;text-align: center;">提交成功</p>
    <x-button style="border: 1px solid rgba(53,53,53,0.80);border-radius: 6px;width:119px;"
              @click.native="goToResult">我知道了
    </x-button>

  </div>
</template>
<script>
import { XHeader, XButton, XImg } from 'vux'
export default {
  name: 'completeCommentSuccess',
  components: {
    XHeader,
    XImg,
    XButton
  },
  data() {
    return {}
  },
  methods: {
    // 图片加载成功函数
    imgSuccess() {
    },
    // 图片加载失败函数
    imgError() {
    },
    goToResult() {
      this.$router.push({ name: 'completeCommentResult' })
    }
  }
}
</script>
<style>
  .completeCommentSuccess_div{
    text-align: center;
    margin-top: 50px;
    margin-bottom: 26px;
  }
.showToast {
  width: 40%;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  margin-top: 10px;
}
.showToast img {
  width: 100%;
}
</style>
