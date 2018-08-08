<template>
  <div class="serveComment">
    <x-header :right-options="{showMore: false}"
              style="box-shadow: 0 2px 10px 0 rgba(0,0,0,0.10);margin-bottom: 15px;"
              @on-click-more="showMenus = true">绩效考评
    </x-header>
    <div class="serveComment_div">
      <flexbox>
        <flexbox-item>
          <div class="serveTitle">{{editTitle}}</div>
        </flexbox-item>
      </flexbox>
<!-- 我的票数 -->
      <group title="我的票数: 5票" title-color="#666">

        <x-number title="好评数：" align="left" v-model="goodCommentNum" button-style="round" :min="0" :max="5"></x-number>
        <x-number title="差评数：" align="left" v-model="badCommentNum" button-style="round" :min="0" :max="5"></x-number>
      </group>
      <!-- 差评说明 -->
      <group>
        <!-- 差评说明 -->
        <x-textarea placeholder="差评说明"
                    v-model="badCommentText"
                    @on-focus="onFocus()"
                    class="serveComment_textarea"
                    style="height: 180px;border: 1px solid rgba(56,145,240,0.5);margin-bottom: 40px;"
                    @on-blur="onBlur()">
        </x-textarea>
      </group>
      <!-- 保存提交按钮 -->
      <flexbox style="margin-bottom: 25px;">
        <flexbox-item>
          <x-button style="background: #f8f8f8;color: #333"
                    @click.native="saveEvent">保存
          </x-button>
        </flexbox-item>
        <flexbox-item>
          <x-button style="background: #3891F0;color: #fff"
                    @click.native="submitEvent">提交
          </x-button>
        </flexbox-item>
      </flexbox>
    </div>

<!-- 提示框 -->
    <toast v-model="showToast" type="text"
           :time="1000" is-show-mask text="已保存至待办事项"
           width="9em"
           position="bottom" style="">
    </toast>
  </div>
</template>
<script>
import { XHeader, Toast, Icon, XNumber, Group, CellBox, Cell, Flexbox, FlexboxItem, XTextarea, XButton } from 'vux'

export default {
  name: 'serveComment',
  components: {
    XHeader,
    Icon,
    Flexbox,
    FlexboxItem,
    Cell,
    Group,
    XButton,
    XTextarea,
    CellBox,
    XNumber,
    Toast
  },
  data() {
    return {
      goodCommentNum: 5, // 好评数
      badCommentNum: 0, // 差评数
      showToast: false,
      editTitle: '',
      badCommentText: '' // 差评说明
    }
  },
  methods: {
    // 差评说明得焦函数
    onFocus() {
      console.log('得焦')
    },
    // 差评说明失焦函数
    onBlur() {
      console.log('失焦')
    },
    saveEvent() {
      console.log('保存')
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
  created() {
    this.editTitle = localStorage.getItem('serveList')
    this.editTitle = JSON.parse(this.editTitle)
    this.editTitle = this.editTitle.name
  }
}
</script>

<style>
.serveComment {
  background: #fff;
}
.serveTitle {
  padding: 20px 0 22px;
  text-align: center;
  font-size: 18px;
  color: #333;
  border-bottom: 1px solid rgba(56, 145, 240, 0.5);
}
.serveComment_div {
  background: #fff;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  margin: 0 15px;
  padding: 10px;
}
.vux-number-selector svg {
  /*fill: #3891F0 !important;*/
}
.weui-cells__title {
  font-size: 16px;
}
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
