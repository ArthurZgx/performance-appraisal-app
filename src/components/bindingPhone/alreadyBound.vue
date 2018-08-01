<!-- 已经绑定微信号页面 -->
<template>
  <div>
    <x-header :right-options="{showMore: true}"
              @on-click-more="showMenus = true">
             绑定账号
    </x-header>
    <div style="width:80%;text-align:center;margin:0 auto;">
        <div class="binding-wechat-img"><img src="../../assets/wechat.png" alt=""></div>
        <div class="already-bound-tip">温馨提示:您的微信号已成功绑定此平台</div>
        <div>
            <x-button link="/bindingPhone" style="width:120px;height:36px;border-radius:5px;border:1px solid #353535;color:353535;font-size:13px;margin-top:10px;">解除绑定</x-button>
        </div>
    </div>
  </div>
</template>

<script>
import { XHeader, XButton } from 'vux'
export default {
  data() {
    return {
    }
  },

  components: {
    XHeader,
    XButton
  },

  computed: {},

  methods: {}
}

</script>
<style scoped>
.binding-wechat-img{
    width: 100px;
    height: 100px;
    margin: 20px auto;
}
.binding-wechat-img img{
    width: 100%;
    height: 100%;
}
.already-bound-tip{
    margin: 20px 0;
}
</style>