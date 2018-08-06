<template>
  <div class="serveComment">
    <x-header :right-options="{showMore: true}"
              style="box-shadow: 0 2px 10px 0 rgba(0,0,0,0.10);margin-bottom: 15px;"
              @on-click-more="showMenus = true">绩效考评
    </x-header>
    <div class="serveComment_div">
      <!-- 展示数据 -->
      <div v-for="(list,index) in serveList">
      <flexbox>
        <flexbox-item>
          <div class="serveTitle">{{list.name}}</div>
        </flexbox-item>
      </flexbox>
      <group title-color="#666" class="commentNumber">
        <x-number title="好评数：" align="left" v-model="list.goodCommentNumber" button-style="round" :min="0" :max="10" @click.native="numberChange(index,'good')"></x-number>
        <x-number title="差评数：" align="left" v-model="list.badCommentNumber" button-style="round" :min="0" :max="10" @click.native="numberChange(index,'bad')"></x-number>
      </group>
      <!-- 差评说明 -->
      <group>
        <x-textarea placeholder="差评说明"
                    v-model="list.badCommentText"
                    @on-focus="onFocus()"
                    class="serveComment_textarea"
                    style="height: 60px;border: 1px solid rgba(56,145,240,0.5);"
                    @on-blur="onBlur()">
        </x-textarea>
      </group>
      </div>
    </div>


    <toast v-model="showToast" type="text"
           :time="1000" is-show-mask text="已保存"
           width="9em"
           position="bottom" style="">
    </toast>
    <toast v-model="showSubmitToast" type="text"
           :time="1000" is-show-mask text="已提交"
           width="9em"
           position="bottom" style="">
    </toast>
          <!-- 保存提交按钮 -->
      <flexbox style="margin-bottom: 0;position:fixed;bottom:0;left:0;background:white;width:100%;padding:10px 0;border-top:1px solid #eee;">
        <flexbox-item>
          <x-button style="background: #f8f8f8;color: #333;width:80%;"
                    @click.native="saveEvent">保存
          </x-button>
        </flexbox-item>
        <flexbox-item>
          <x-button style="background: #3891F0;color: #fff;width:80%;"
                    @click.native="submitEvent">提交
          </x-button>
        </flexbox-item>
      </flexbox>
  </div>
</template>
<script>
import { XHeader, Toast, Icon, XNumber, Group, CellBox, Cell, Flexbox, FlexboxItem, XTextarea, XButton } from 'vux'
import _ from 'lodash'
import { setTimeout } from 'timers'
import request from '@/utils/request'
import { paramEncode } from '@/utils'

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
      showToast: false,
      editTitle: '',
      badCommentText: '', // 差评说明
      serveList: [],
      showSubmitToast: false
    }
  },
  created() {
    this.serveList = JSON.parse(localStorage.getItem('needBadCommentPeopleList'))
    for (var i = 0, len = this.serveList.length; i < len; i++) {
      this.serveList[i].badCommentNumber = 10 - this.serveList[i].goodCommentNumber
      this.serveList[i].badCommentText = ''
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
    numberChange(index, type) {
      var that = this
      var list = this.serveList[index]
      setTimeout(function() {
        if (type === 'good') {
          list.badCommentNumber = 10 - list.goodCommentNumber
        } else if (type === 'bad') {
          list.goodCommentNumber = 10 - list.badCommentNumber
        }
        that.serveList.splice(index, list)
      }, 1)
    },
    // 提交评价
    submitEvent() {
      this.showSubmitToast = true
      var that = this
      let params = []
      _.each(that.serveList, function(item, key) {
        const temp = {}
        temp.id = item.id
        temp.status = 2
        temp.numberVotes = item.goodCommentNumber
        temp.praiseNumber = item.goodCommentNumber
        temp.badNumber = item.badCommentNumber
        temp.badReview = item.badCommentText
        params.push(temp)
      })
      params = JSON.stringify(params)
      console.log(params)
      request('main_service_details/edit/batch/', {
        params: {
          params: params
        },
        method: 'POST',
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          'X-Auth-Token': '7235ba9e71f7493d9d56b29401d9f47c',
          'LoginType': 'web'
        },
        transformRequest: paramEncode
      })
      setTimeout(function() {
        that.$router.push({ name: 'serve' })
      }, 500)
      // var json = {
      //   goodCommentNum: this.goodCommentNum,
      //   badCommentNum: this.badCommentNum,
      //   badCommentText: this.badCommentText
      // }
      // this.serveList.status = '1'
      // localStorage.setItem('jsonTemp', JSON.stringify(json))
      // localStorage.setItem('serveList', JSON.stringify(this.serveList))
      // this.$router.push({ name: 'serveCommentSuccess' })
      // console.log(localStorage.getItem('serveList'))
    }
    // goodOption(type) {
    //   if (type === 'minus') {
    //     if (this.goodCommentNum > 0) {
    //       this.goodCommentNum--
    //     }
    //   } else if (type === 'plus') {
    //     this.goodCommentNum++
    //   }
    // },
    // badOption(type) {
    //   if (type === 'minus') {
    //     if (this.badCommentNum > 0) {
    //       this.badCommentNum--
    //     }
    //   } else if (type === 'plus') {
    //     this.badCommentNum++
    //   }
    // }
  }
}
</script>

<style>
.serveComment {
  background: #fff;
}
.serveTitle {
  padding: 5px 0 5px;
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
.serveComment_div .weui-cells{
  margin-top: 0px;
}
.serveComment .weui-cell::before{
  border-top: none;
}
.serveComment .weui-cells::before{
  border: none;
}
.serveComment .weui-cells::after{
  border: none;
}
.serveComment .commentNumber .vux-no-group-title .weui-cell{
  padding: 5px 5px;
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
