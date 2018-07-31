<template>
  <div class="completeComment">
    <x-header :right-options="{showMore: true}"
              style="box-shadow: 0 2px 10px 0 rgba(0,0,0,0.10);margin-bottom: 15px;"
              @on-click-more="showMenus = true">
      绩效考评
    </x-header>
    <div class="content">
      <div class="completeComment_div" style="text-align: center;">{{currentName}}工作完成度评价</div>
      <!-- 任务列表 -->
      <group v-for="(task,index) in taskList" label-width="100%" :title="'任务' + (index+1)" :key="index">
        <!--<cell primary="content" title="default" value="long "></cell>-->
        <cell :title="task.taskDesc" value-align="right">
          <div slot="inline-desc" style="margin-top: 6px;">
            <div style="margin-bottom: 17px;">
              <span style="margin-right: 5px;">权重</span> <span>{{task.proportion}}</span>
              <span style="margin-left: 10px;margin-right: 5px;">实际完成度</span> <span>{{task.hasDone}}</span>
            </div>
            <flexbox justify="flex-end" :gutter="20" style="margin-bottom: 20px;">
              <flexbox-item :span="2">
                <x-button style="width: 64px;font-size: 12px;"
                          :class="task.clickCompleted?'btn_hasCompleted':'btn_default'"
                          @click.native="hasCompleted(task)">完成
                </x-button>
              </flexbox-item>
              <flexbox-item :span="2">
                <x-button style="width: 64px;font-size: 12px;"
                          :class="task.clickNoCompleted?'btn_hasCompleted':'btn_default'"
                          @click.native="noCompleted(task)">未完成
                </x-button>
              </flexbox-item>
            </flexbox>
          </div>
        </cell>
      </group>
      <p style="text-align: right;margin-bottom: 50px;margin-top: 17px;">最终系数 <span>{{totalHasDone}}</span></p>
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
      <!-- 保存提示 -->
      <toast v-model="showToast" type="text"
             :time="1000" is-show-mask text="已保存至待办事项"
             width="9em"
             position="bottom" style="">
      </toast>
      <!-- 点击未完成时的弹出框-->
      <confirm v-model="showConfirm"
               show-input
               title="请打分（0~100的整数）"
               :input-attrs="{type: 'number',value: ''}"
               @on-cancel="cancelConfirm"
               @on-confirm="confirm"
               @on-show="confirmShow"
               @on-hide="confirmHide">
      </confirm>
    </div>
  </div>
</template>
<script>
  import { XHeader, Toast, Icon, XTable, Flexbox, FlexboxItem, XButton, Cell, Group, Confirm } from 'vux'
  import _ from 'lodash'

  export default {
    name: 'completeComment',
    components: {
      XHeader,
      Icon,
      XTable,
      Cell,
      Group,
      XButton,
      Flexbox,
      Confirm,
      FlexboxItem,
      Toast
    },
    data() {
      return {
        currentName: '', // 当前工作任务所属
        currentTask: {}, // 点击未完成时的当前任务
        goodCommentNum: 0,
        badCommentNum: 0,
        editTitle: '',
        showToast: false,
        badCommentText: '',
        showConfirm: false, // 点击未完成的弹出框
        taskList: [
          { taskDesc: '2018年是决胜全面建成小康社会、实施“十三五”规划承上启下的关键一年', proportion: '10%', order: 1, hasDone: '', clickCompleted: false, clickNoCompleted: false },
          { taskDesc: '第十二届全国人民代表大会第一次会议以来的五年，是我国发展进程中极不平凡的五年', proportion: '20%', order: 2, hasDone: '', clickCompleted: false, clickNoCompleted: false },
          { taskDesc: '五年来，经济实力跃上新台阶。国内生产总值从54万亿元增加到82.7万亿元，年均增长7.1%', proportion: '30%', order: 3, hasDone: '', clickCompleted: false, clickNoCompleted: false },
          { taskDesc: '五年来，创新驱动发展成果丰硕。全社会研发投入年均增长11%，规模跃居世界第二位', proportion: '40%', order: 4, hasDone: '', clickCompleted: false, clickNoCompleted: false }
        ]
      }
    },
    created() {
      this.editTitle = localStorage.getItem('serveList')
      this.editTitle = JSON.parse(this.editTitle)
      this.editTitle = this.editTitle.name
      this.currentName = localStorage.getItem('currentName')
      console.log(175, this.currentName)
      var json = localStorage.getItem('jsonTemp')
      json = JSON.parse(json)
      console.log(json)
      this.goodCommentNum = json.goodCommentNum
      this.badCommentNum = json.badCommentNum
      this.badCommentText = json.badCommentText
    },
    computed: {
      totalHasDone: function() {
        let temp = 0
        _.each(this.taskList, function(item, key) {
          if (item.hasDone) {
            temp += parseInt(item.hasDone)
          }
        })
        return temp + '%'
      }
    },
    methods: {
      // 完成函数
      hasCompleted(task) {
        task.clickCompleted = !task.clickCompleted
        task.clickNoCompleted = false
        task.hasDone = task.hasDone ? '' : task.proportion
      },
      // 未完成函数
      noCompleted(task) {
        this.showConfirm = true
        this.currentTask = task
        task.hasDone = ''
        // task.clickNoCompleted = !task.clickNoCompleted
        task.clickCompleted = false
      },
      // 弹出框点击确定时
      confirm(value) {
        console.log('点击确定', value)
        if (value) {
          this.currentTask.hasDone = value + '%'
          this.currentTask.clickNoCompleted = true
        }
        console.log(this.currentTask)
      },
      // 弹出框点击取消时
      cancelConfirm() {
        console.log('取消')
        this.currentTask.clickNoCompleted = false
      },
      // 弹出框显示时
      confirmShow() {
        console.log('显示')
      },
      // 弹出框隐藏时
      confirmHide() {
        console.log('隐藏')
        this.currentTask = {}
      },
      // 保存
      saveEvent() {
        console.log('保存')
        this.showToast = true
      },
      // 提交
      submitEvent() {
        // const json = list
        localStorage.setItem('jsonTemp', JSON.stringify(this.taskList))
        localStorage.setItem('totalHasDone', JSON.stringify(this.totalHasDone))
        this.$router.push({ name: 'completeCommentSuccess' })
      }
    }
  }
</script>

<style>
.completeComment_div {
  text-align: center;
  padding: 10px 0;
  /*border: 1px solid #eee;*/
  margin-top: 19px;
  margin-bottom: 21px;
}
.content {
  padding: 0 10px;
}
.completeComment .btn_hasCompleted {
  background-color: #3891f0;
  color: #fff;
}
.completeComment .btn_default {
  color: #333;
}
.completeComment .weui-cells:before {
  border-top: none;
}
/*56,145,240, 0.5*/
.completeComment .weui-cells:after {
  border-bottom: 1px solid rgba(56, 145, 240, 0.5);
}
</style>
