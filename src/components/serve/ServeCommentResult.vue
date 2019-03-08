<template>
  <div class="serveCommentResult">
    <x-header :right-options="{showMore: false}"
              style="box-shadow: 0 2px 10px 0 rgba(0,0,0,0.10);margin-bottom: 15px;"
              @on-click-more="showMenus = true">
      绩效考评
    </x-header>
    <div class="serveCommentResult_div" style="text-align: center;">{{editTitle}}</div>
    <x-table full-bordered style="margin:0 auto;width:90%;">
      <tbody>
      <tr>
        <td>我的票数</td>
        <td>{{goodCommentNum+badCommentNum}}</td>
      </tr>
      <tr>
        <td>好评数</td>
        <td>{{goodCommentNum}}</td>
      </tr>
      <tr>
        <td>差评数</td>
        <td>{{badCommentNum}}</td>
      </tr>
      <tr>
        <td>差评说明</td>
        <td>{{badCommentText}}</td>
      </tr>
      </tbody>
    </x-table>
  </div>
</template>
<script>
import { XHeader, Toast, Icon, XTable } from 'vux'

export default {
  name: 'serveCommentResult',
  components: {
    XHeader,
    Icon,
    XTable,
    Toast
  },
  data() {
    return {
      goodCommentNum: 0,
      badCommentNum: 0,
      editTitle: '',
      badCommentText: ''
    }
  },
  methods: {},
  created() {
    this.editTitle = localStorage.getItem('serveList')
    this.editTitle = JSON.parse(this.editTitle)
    this.editTitle = this.editTitle.name
    var json = localStorage.getItem('jsonTemp')
    json = JSON.parse(json)
    // console.log(json)
    this.goodCommentNum = json.goodCommentNum
    this.badCommentNum = json.badCommentNum
    this.badCommentText = json.badCommentText
  }
}
</script>

<style scoped>
  .serveCommentResult_div {
    text-align: center;
    padding: 10px 0;
    border: 1px solid #eee;
    margin-top: 19px;
    margin-bottom: 21px;
  }
  .table-row {
    display: flex;
    flex-direction: row;
  }
  .table-row div {
    width: 50%;
    padding: 5px 0;
    text-align: center;
    border: 1px solid #eee;
  }

  .vux-table td{
    width: 90px;
  }
  /* 表格下边框 */
  .vux-table td:before,
  .vux-table th:before {
    border-color: #3891f0;
  }
  /* 表格右边框 */
  .vux-table td:after,
  .vux-table th:after {
    border-color: #3891f0;
  }
  /* 表格左边框 */
  .vux-table.vux-table-bordered:before {
    border-color: #3891f0;
  }
  .vux-table:after {
    border-color: #3891f0;
  }
</style>
