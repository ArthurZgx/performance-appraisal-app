<!-- 绑定手机号 -->
<template>
  <div>
    <x-header :right-options="{showMore: true}"
                @on-click-more="showMenus = true"
                right-options.showMore="false">
                绑定手机号
      </x-header>
      <div>
        <div class="title-tip">请输入手机号验证身份</div>
          <group v-if="step==1">
              <x-input title="+86" name="mobile" placeholder="请输入您绑定的手机号" keyboard="number" is-type="china-mobile" v-model="phoneNumber"></x-input>
              <div v-show="hasErrorMsg" class="error-tip"><span class="error-tip-img"><img src="http://ui.haomo-tech.com/%E9%93%B6%E4%BF%A1%E9%95%BF%E8%BF%9C/assets/Path%20.png" alt=""></span>您输入的手机号信息不匹配,请检查</div>
          </group>
          <group v-if="step==2">
              <x-input title="发送验证码" class="weui-vcode" v-model="vcode">
                <x-button slot="right" style="background:white;border:none;color:#4F93F4;">发送验证码</x-button>
              </x-input>
          </group>

          <x-button class="next-btn" @click.native="nextStep">下一步</x-button>
      </div>
      <toast v-model="vcodeErrorToast" type="text" :time="800" is-show-mask text="验证码错误" position="bottom"></toast>
  </div>
</template>

<script>
import { XHeader, Group, XInput, XButton, Toast } from 'vux'
export default {
  data() {
    return {
      step: 1,
      hasErrorMsg: false,
      vcodeErrorToast: false,
      phoneNumber: '',
      vcode: ''
    }
  },

  components: {
    XHeader,
    Group,
    XInput,
    XButton,
    Toast
  },

  computed: {},

  methods: {
    nextStep() {
      // 判断在第几步
      if (this.step === 1) {
        if (this.phoneNumber === '12345678910') {
          this.hasErrorMsg = true
        } else {
          this.step++
        }
        return false
      } else if (this.step === 2) {
        this.vcodeErrorToast = true
      }
    }
  }
}

</script>
<style scoped>
.title-tip{
  font-size:21px;
  margin-top:15px;
  margin-left:15px;
  color:#333;
  margin-bottom:20px;
}
.error-tip{
  font-size: 13px;
  color: #F76260;
  margin-left: 20px;
}
.error-tip-img{
  display: inline-block;
  width: 15px;
  height: 15px;
  background: #F76260;
  text-align: center;
  border-radius: 50%;
  margin-right: 10px;

}
.error-tip-img img{
  width:3px;
  height:10px;
  margin-top: 2px;
}
.next-btn{
  background:#3891F0;
  color:white;
  margin-top:100px;
  width:84%;
}
</style>
