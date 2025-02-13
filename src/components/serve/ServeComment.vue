<template>
  <div class="serveComment">
    <x-header
      :right-options="{ showMore: false }"
      style="margin-bottom: 15px"
      @on-click-more="showMenus = true"
      >绩效考评
    </x-header>
    <div
      style="padding-left: 15px; color: #666; font-size: 16px; margin: 10px 0"
      v-if="praiseSetting.praiseNumber || praiseSetting.badNumber"
    >
      剩余好评票 {{ praiseSetting.residualPraiseNumber }} &nbsp;&nbsp;|&nbsp;&nbsp;剩余差评票 {{ praiseSetting.residualBadNumber }}
    </div>
    <div class="serveComment_div">
      <!-- 展示数据 -->
      <div v-for="(list, index) in serveList" :key="index">
        <flexbox>
          <flexbox-item>
            <div class="serveTitle">{{ list.name }}</div>
          </flexbox-item>
        </flexbox>
        <group title-color="#666" class="commentNumber">
          <table style="width: 100%;padding: 20px 0;">
            <tr>
              <td class="kh-table-text" style="font-weight: bold;"></td>
              <td class="kh-table-text" style="font-weight: bold;">差</td>
              <td class="kh-table-text" style="font-weight: bold;">中</td>
              <td class="kh-table-text" style="font-weight: bold;">好</td>
              <td class="kh-table-text" style="font-weight: bold;"></td>
            </tr>
            <tr>
              <td class="kh-table-text" style="display: flex;justify-content: end;">
                <a @click="handleChangePraiseNumber(list, -1)" class="kh-number-selector kh-number-selector-sub":class="{'kh-number-disabled': getMinDisabled(list)}">
                  <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="18" height="18"><defs></defs><path d="M863.74455 544.00086 163.424056 544.00086c-17.664722 0-32.00086-14.336138-32.00086-32.00086s14.336138-32.00086 32.00086-32.00086l700.320495 0c17.695686 0 31.99914 14.336138 31.99914 32.00086S881.440237 544.00086 863.74455 544.00086z"></path></svg>
                </a>
              </td>
              <td class="kh-table-text">{{list.badNumber}}</td>
              <td class="kh-table-text">{{list.middleNumber}}</td>
              <td class="kh-table-text">{{list.praiseNumber}}</td>
              <td class="kh-table-text">
                <a @click="handleChangePraiseNumber(list, 1)" class="kh-number-selector kh-number-selector-plus" :class="{'kh-number-disabled': getMaxDisabled(list)}">
                  <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20"><defs></defs><path d="M863.328262 481.340895l-317.344013 0.099772L545.984249 162.816826c0-17.664722-14.336138-32.00086-32.00086-32.00086s-31.99914 14.336138-31.99914 32.00086l0 318.400215-322.368714-0.17718c-0.032684 0-0.063647 0-0.096331 0-17.632039 0-31.935493 14.239806-32.00086 31.904529-0.096331 17.664722 14.208843 32.031824 31.871845 32.095471l322.59234 0.17718 0 319.167424c0 17.695686 14.336138 32.00086 31.99914 32.00086s32.00086-14.303454 32.00086-32.00086L545.982529 545.440667l317.087703-0.099772c0.063647 0 0.096331 0 0.127295 0 17.632039 0 31.935493-14.239806 32.00086-31.904529S880.960301 481.404542 863.328262 481.340895z"></path></svg>
                </a></td>
            </tr>
          </table>
          <div style="color: rgb(41 155 232); margin: 10px 5px">
            <!-- 选票分值：{{ getUserScore(list) }} -->
            推送票数：{{ list.numberVotes }}
          </div>
        </group>
        <!-- 差评说明 -->
        <group>
          <x-textarea
            placeholder="差评说明"
            v-model="list.badCommentText"
            @on-focus="onFocus()"
            class="serveComment_textarea"
            style="height: 62px; border: 1px solid rgba(56, 145, 240, 0.5)"
            @on-blur="onBlur()"
          >
          </x-textarea>
        </group>
      </div>
    </div>

    <toast
      v-model="showToast"
      type="text"
      :time="1000"
      is-show-mask
      text="已保存"
      width="9em"
      position="bottom"
      style=""
    >
    </toast>
    <toast
      v-model="showSubmitToast"
      type="text"
      :time="1000"
      is-show-mask
      text="已提交"
      width="9em"
      position="bottom"
      style=""
    >
    </toast>
    <!-- 保存提交按钮 -->
    <flexbox
      style="
        margin-bottom: 0;
        position: fixed;
        bottom: 0;
        left: 0;
        background: white;
        width: 100%;
        border-top: 1px solid #eee;
      "
    >
      <flexbox-item style="margin-left: 0px">
        <!-- <x-button style="background: #f8f8f8;color: #333;width:80%;"
                    @click.native="saveEvent">保存
          </x-button> -->
        <div
          @click="saveEvent"
          style="
            text-align: center;
            background: #f8f8f8;
            color: #333;
            padding: 10px 0;
            margin-left: 0px;
          "
        >
          保存
        </div>
      </flexbox-item>
      <flexbox-item style="margin-left: 0px">
        <!-- <x-button style="background: #3891F0;color: #fff;width:80%;"
                    @click.native="submitEvent">提交
          </x-button> -->
        <div
          @click="submitEvent"
          style="
            text-align: center;
            background: #5177aa;
            color: #fff;
            padding: 10px 0;
            margin-left: 0px;
          "
        >
          提交
        </div>
      </flexbox-item>
    </flexbox>
  </div>
</template>
<script>
/* eslint-disable */
import {
  XHeader,
  Toast,
  Icon,
  XNumber,
  Group,
  CellBox,
  Cell,
  Flexbox,
  FlexboxItem,
  XTextarea,
  XButton,
} from "vux";
import _ from "lodash";
import { setTimeout } from "timers";
import request from "@/utils/request";

export default {
  name: "serveComment",
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
    Toast,
  },
  data() {
    return {
      showToast: false,
      editTitle: "",
      badCommentText: "", // 差评说明
      serveList: [],
      showSubmitToast: false,
      praiseSetting: {
        praiseNumber: 0,
        badNumber: 0,
        residualPraiseNumber: 0,
        residualBadNumber: 0,
      },
    };
  },
  async created() {
    // localStorage.setItem('serve', 'true')
    this.serveList = JSON.parse(
      localStorage.getItem("needBadCommentPeopleList")
    );
    await this.getSysConfig();
    this.handleChangePraiseSetting()  
  },
  methods: {
    getSysConfig() {
      var userId = localStorage.getItem("userId");
      return request("getMyEvaluateNumber", {
        method: "POST",
        params: {
          userId: userId,
        },
      })
        .then((res) => {
          this.praiseSetting.praiseNumber = res.data.praiseNumber || 0
          this.praiseSetting.residualPraiseNumber = res.data.residualPraiseNumber || 0
          this.praiseSetting.badNumber = res.data.badNumber || 0
          this.praiseSetting.residualBadNumber = res.data.residualBadNumber || 0
          let maxVoteNumber = 0
          this.serveList.forEach(item => {
            maxVoteNumber += item.numberVotes
          })
          if (this.praiseSetting.praiseNumber > maxVoteNumber) {
            this.praiseSetting.praiseNumber = maxVoteNumber
          }
          if (this.praiseSetting.badNumber > maxVoteNumber) {
            this.praiseSetting.badNumber = maxVoteNumber
          }
        })
        .catch((err) => {
          console.log("请求出错", err);
        });
    },
    // 差评说明得焦函数
    onFocus() {
      // console.log('得焦')
    },
    // 差评说明失焦函数
    onBlur() {
      // console.log('失焦')
    },
    saveEvent() {
      // console.log('保存')
      this.showToast = true;
      var that = this;
      let params = [];
      _.each(that.serveList, function (item, key) {
        const temp = {};
        temp.id = item.id;
        temp.status = 1;
        if (item.praiseNumber === 0 && item.middleNumber === 0 && item.badNumber === 0) {
          item.middleNumber = item.numberVotes
        }
        temp.praiseNumber = item.praiseNumber;
        temp.middleNumber = item.middleNumber;
        temp.badNumber = item.badNumber;
        temp.badReview = item.badCommentText;
        params.push(temp);
      });
      params = JSON.stringify(params);
      // console.log(params)
      request("main_service_details/edit/batch/", {
        data: params,
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "X-Auth-Token": "7235ba9e71f7493d9d56b29401d9f47c",
          LoginType: "web",
        },
      });
      setTimeout(function () {
        // that.$router.push({ name: 'serve' })
        that.$router.go(-1);
      }, 500);
    },
    // 提交评价
    submitEvent() {
      this.showSubmitToast = true;
      var that = this;
      let params = [];
      let date = new Date();
      let month = date.getMonth() + 1;
      if (month < 10) {
        month = "0" + month;
      }
      date = date.toString().split(" ");
      date = date[3] + "-" + month + "-" + date[2] + " " + date[4];
      _.each(that.serveList, function (item, key) {
        const temp = {};
        temp.id = item.id;
        temp.status = 2;
        if (item.praiseNumber === 0 && item.middleNumber === 0 && item.badNumber === 0) {
          item.middleNumber = item.numberVotes
        }
        temp.praiseNumber = item.praiseNumber;
        temp.middleNumber = item.middleNumber;
        temp.badNumber = item.badNumber;
        temp.badReview = item.badCommentText || "无评价";
        temp.evaluationTime = date;
        params.push(temp);
      });
      params = JSON.stringify(params);
      // console.log(params)
      request("main_service_details/edit/batch/", {
        data: params,
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
          "X-Auth-Token": "7235ba9e71f7493d9d56b29401d9f47c",
          LoginType: "web",
        },
      });
      setTimeout(function () {
        // that.$router.push({ name: 'serve' })
        that.$router.go(-1);
      }, 500);
    },
    getMinDisabled(list) {
      if (list.praiseNumber > 0) return false
      if (list.badNumber === list.numberVotes) return true;
      if (this.praiseSetting.residualBadNumber === 0) return true;
    },
    getMaxDisabled(list) {
      if (list.badNumber > 0) return false
      if (list.praiseNumber === list.numberVotes) return true;
      if (this.praiseSetting.residualPraiseNumber === 0) return true;
    },
    handleChangePraiseNumber(list, count) {
      if (count < 0 && this.getMinDisabled(list)) {
        return
      }
      if (count > 0 && this.getMaxDisabled(list)) {
        return
      }
      if (count < 0) {
        if (list.praiseNumber > 0) {
          list.praiseNumber--
          list.middleNumber++
        } else {
          list.middleNumber--
          list.badNumber++
        }
      }
      if (count > 0) {
        if (list.badNumber > 0) {
          list.badNumber--
          list.middleNumber++
        } else {
          list.middleNumber--
          list.praiseNumber++
        }
      }
      this.handleChangePraiseSetting()
    },
    handleChangePraiseSetting() {
      // 计算剩余的好评票数
      let totalPraiseVoteNumber = 0
      let totalBadVoteNumber = 0
      this.serveList.forEach(item => {
          totalPraiseVoteNumber += (item.praiseNumber || 0)
          totalBadVoteNumber += (item.badNumber || 0)
      })
      this.praiseSetting.residualPraiseNumber = this.praiseSetting.praiseNumber - totalPraiseVoteNumber
      this.praiseSetting.residualBadNumber = this.praiseSetting.badNumber - totalBadVoteNumber
    },
  },
};
</script>

<style>
.serveComment {
  background: #fff;
  padding-bottom: 60px;
}
.serveComment .serveTitle {
  padding: 5px 0 5px;
  text-align: center;
  font-size: 20px;
  font-weight: bold;
  color: #333;
  border-bottom: 1px solid rgba(56, 145, 240, 0.5);
}
.serveComment .weui-toast {
  border-radius: 20px;
}
.serveComment_div {
  background: #fff;
  box-shadow: 0 2px 4px 2px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  margin: 0 15px;
  padding: 10px;
}
.serveComment_div .weui-cells {
  margin-top: 0px;
}
.serveComment .weui-cell::before {
  border-top: none;
}
.serveComment .weui-cells::before {
  border: none;
}
.serveComment .weui-cells::after {
  border: none;
}
.serveComment .commentNumber .vux-no-group-title .weui-cell {
  padding: 5px 5px;
}
.vux-number-selector svg {
  /*fill: #3891F0 !important;*/
}
.serveComment .weui-cells__title {
  font-size: 16px;
}
.serveComment .commentTable {
  width: 90%;
  height: 700px;
  border: 1px solid #ccc;
  margin: 10px auto;
}
.serveComment .commentTableTitle {
  text-align: center;
  padding: 15px 0;
  font-weight: bold;
  border-bottom: 1px solid #eee;
}
.serveComment .commentTableContent {
  color: #666;
}
.serveComment .commentTableContentTitle {
  padding: 10px 15px;
  border-bottom: 1px solid #eee;
}
.serveComment .minus,
.serveComment .plus {
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
.serveComment .commentTableContentGood,
.serveComment .commentTableContentBad {
  font-weight: normal;
  padding: 15px 30px;
}
.serveComment .commentTableComment {
  width: 100%;

  text-align: center;
}
.serveComment .commentInput {
  width: 90%;
  height: 200px;
  margin: 10px auto;
  padding: 10px;
  background: #fbf9fe;
  border: 1px solid #eee;
}
.serveComment .commentTableFooterBtns {
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.serveComment .commentTableFooterBtn {
  width: 100px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
.serveComment .primaryBtn {
  background: #3891f0;
  color: white;
  margin-left: 30px;
}
.kh-number-selector {
  color: #5177aa;
  border-radius: 50%;
  border: 1px solid #5177aa;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2px;
  width: 20px;
  height: 20px;
}
.kh-number-selector svg {
    fill: #5177aa;
}
.kh-number-disabled {
  color: #ccc;
  border: 1px solid #ccc; 
}
.kh-number-disabled svg {
    fill: #ccc;
}
.kh-table-text {
  color: #666;
  font-size: 20px;
  padding: 0px 6px;
  text-align: center;
}
</style>
