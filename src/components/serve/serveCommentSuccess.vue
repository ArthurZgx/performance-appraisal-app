<template>
  <div class="serveCommentSuccess">
      <div class="showToast">
      <img src="http://ui.haomo-tech.com/%E9%93%B6%E4%BF%A1%E9%95%BF%E8%BF%9C/assets/%E6%8F%90%E4%BA%A4%E6%88%90%E5%8A%9F.png" alt="">
        <div>提交成功</div>
        <span  @click="goToResult"><x-button>我知道了</x-button></span>
        
    </div>
  </div>
</template>
<script>
import { XHeader, XButton } from 'vux'
export default {
  name: 'serveCommentSuccess',
  components: {
    XHeader,
    XButton
  },
  data() {
    return {}
  },
  methods: {
    goToResult() {
      this.$router.push({ name: 'serveCommentResult' })
    }
  }
}
</script>
<style scope>
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