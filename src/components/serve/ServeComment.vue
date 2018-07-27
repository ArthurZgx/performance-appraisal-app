<template>
  <div class="serve">
    <x-header :right-options="{showMore: true}"
              @on-click-more="showMenus = true">
      绩效考评
    </x-header>

    <div class="commentTable">
      <div class="commentTableTitle">{{editTitle}}</div>
      <div class="commentTableContent">
        <div class="commentTableContentTitle">我的票数</div>
        <div class="commentTableContentGood">好评数<span class="minus" @click="goodOption('minus')">-</span>{{goodCommentNum}}<span @click="goodOption('plus')" class="plus">+</span></div>
        <div class="commentTableContentBad">差评数<span class="minus" @click="badOption('minus')">-</span>{{badCommentNum}}<span @click="badOption('plus')" class="plus">+</span></div>
      </div>
      <div class="commentTableComment">
          <textarea class="commentInput" v-model="badCommentText" placeholder="差评说明"></textarea>
      </div>
      <div class="commentTableFooterBtns">
          <div class="commentTableFooterBtn" @click="saveEvent">保存</div>
          <div class="commentTableFooterBtn primaryBtn" type="primary" @click="submitEvent">提交</div>              
      </div>     
    </div>

     <toast v-model="showToast" type="text" :time="800" is-show-mask text="成功添加到待办事项中" position="bottom"></toast>
  </div>
</template>
<script>
import { XHeader, Toast, Icon } from 'vux'
export default {
  name: 'serveComment',
  components: {
    XHeader,
    Icon,
    Toast
  },
  data() {
    return {
      goodCommentNum: 5,
      badCommentNum: 0,
      showToast: false,
      editTitle: '',
      badCommentText: ''
    }
  },
  methods: {
    saveEvent() {
      console.log('输出')
      this.showToast = true
    },
    submitEvent() {
      var json = {
        goodCommentNum: this.goodCommentNum,
        badCommentNum: this.badCommentNum,
        badCommentText: this.badCommentText
      }
      localStorage.setItem('jsonTemp', JSON.stringify(json))
      this.$router.push({ name: 'serveCommentSuccess' })
    },
    goodOption(type) {
      if (type === 'minus') {
        if (this.goodCommentNum > 0) {
          this.goodCommentNum--
        }
      } else if (type === 'plus') {
        this.goodCommentNum++
      }
    },
    badOption(type) {
      if (type === 'minus') {
        if (this.badCommentNum > 0) {
          this.badCommentNum--
        }
      } else if (type === 'plus') {
        this.badCommentNum++
      }
    }
  },
  mounted() {
    this.editTitle = localStorage.getItem('serveList')
    this.editTitle = JSON.parse(this.editTitle)
    this.editTitle = this.editTitle.name
  }
}
</script>

<style>
.commentTable {
  width: 90%;
  height: 700px;
  border: 1px solid #ccc;
  margin: 10px auto;
}
.commentTableTitle {
  text-align: center;
  padding: 15px 0;
  font-weight: bold;
  border-bottom: 1px solid #eee;
}
.commentTableContent {
  color: #666;
}
.commentTableContentTitle {
  padding: 10px 15px;
  border-bottom: 1px solid #eee;
}
.minus,
.plus {
  width: 22px;
  height: 22px;
  text-align: center;
  line-height: 22px;
  font-weight: bold;
  font-size: 17px;
  display: inline-block;
  border-radius: 50%;
  background: #eee;
  margin: 0 10px;
  color: #999;
}
.commentTableContentGood,
.commentTableContentBad {
  font-weight: normal;
  padding: 15px 30px;
}
.commentTableComment {
  width: 100%;

  text-align: center;
}
.commentInput {
  width: 90%;
  height: 200px;
  margin: 10px auto;
  padding: 10px;
  background: #fbf9fe;
  border: 1px solid #eee;
}
.commentTableFooterBtns {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.commentTableFooterBtn {
  width: 100px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.primaryBtn {
  background: #3891f0;
  color: white;
  margin-left: 30px;
}
</style>