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
          <x-number
            title="好评数："
            align="left"
            v-model="list.veryGoodCommentNumber"
            button-style="round"
            :min="0"
            :max="
              list.veryGoodCommentNumber + praiseSetting.residualPraiseNumber
            "
            @on-change="handleChangePraiseSetting"
          ></x-number>
          <x-number
            title="中评数："
            align="left"
            v-model="list.goodCommentNumber"
            button-style="round"
            :min="getMinVoteNumber({...list})"
            :max="list.numberVotes"
            @click.native="numberChange(index, 'good', $event)"
            @on-change="handleChangePraiseSetting"
          ></x-number>
          <x-number
            title="差评数："
            align="left"
            v-model="list.badCommentNumber"
            button-style="round"
            :min="0"
            :max="getMaxBadVoteNumber({...list})"
            @click.native="numberChange(index, 'bad', $event)"
            @on-change="handleChangePraiseSetting"
          ></x-number>
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
    for (var i = 0, len = this.serveList.length; i < len; i++) {
      this.serveList[i].badCommentNumber =
        this.serveList[i].numberVotes - this.serveList[i].goodCommentNumber;
    }
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
        temp.praiseNumber = item.goodCommentNumber + item.veryGoodCommentNumber;
        temp.badNumber = item.badCommentNumber;
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
    numberChange(index, type, e) {
      var that = this;
      var list = this.serveList[index];
      setTimeout(function () {
        if (type === "good") {
          list.badCommentNumber = list.numberVotes - list.goodCommentNumber;
        } else if (type === "bad") {
          list.goodCommentNumber = list.numberVotes - list.badCommentNumber;
        }
        that.serveList.splice(index, list);
      }, 100);
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
        temp.praiseNumber = item.goodCommentNumber + item.veryGoodCommentNumber;
        temp.badNumber = item.badCommentNumber;
        temp.badReview = item.badCommentText;
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
    getUserScore(voteInfo) {
      return (
        voteInfo.veryGoodCommentNumber +
        voteInfo.goodCommentNumber
      );
    },
    handleChangePraiseSetting() {
      // 计算剩余的好评票数
      let totalPraiseVoteNumber = 0
      let totalBadVoteNumber = 0
      this.serveList.forEach((item) => {
        totalPraiseVoteNumber += item.veryGoodCommentNumber || 0;
        totalBadVoteNumber += item.badCommentNumber || 0;
      });
      console.log('totalBadVoteNumber', totalBadVoteNumber)
      this.praiseSetting.residualPraiseNumber =
        this.praiseSetting.praiseNumber - (totalPraiseVoteNumber);
      this.praiseSetting.residualBadNumber = this.praiseSetting.badNumber - totalBadVoteNumber;
    },
    getMinVoteNumber(list) {
      if (this.praiseSetting.residualBadNumber <= 0) return list.numberVotes - list.badCommentNumber;
      const min = list.numberVotes - list.badCommentNumber - this.praiseSetting.residualBadNumber;
      return min < 0 ? 0 : min;
    },
    getMaxBadVoteNumber(list) {
      if (this.praiseSetting.residualBadNumber <= 0) return list.badCommentNumber;
      const max = list.badCommentNumber + this.praiseSetting.residualBadNumber;
      return max > list.numberVotes ? list.numberVotes : max;
    }
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
</style>
