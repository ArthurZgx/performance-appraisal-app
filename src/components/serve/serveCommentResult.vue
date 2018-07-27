<template>
  <div class="serve">
    <x-header :right-options="{showMore: true}"
              @on-click-more="showMenus = true">
      绩效考评
    </x-header>
    <div>
        <div class="table-title">{{editTitle}}</div>
        <div>
            <div class="table-row"><div>我的票数:</div><div>{{goodCommentNum+badCommentNum}}</div></div>
            <div class="table-row"><div>好评数:</div><div>{{goodCommentNum}}</div></div>
            <div class="table-row"><div>差评数:</div><div>{{badCommentNum}}</div></div>
            <div class="table-row"><div>差评说明:</div><div>{{badCommentText}}</div></div>
            
        </div>
    </div>
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
      goodCommentNum: 0,
      badCommentNum: 0,
      editTitle: '',
      badCommentText: ''
    }
  },
  methods: {},
  mounted() {
    this.editTitle = localStorage.getItem('serveList')
    this.editTitle = JSON.parse(this.editTitle)
    this.editTitle = this.editTitle.name
    var json = localStorage.getItem('jsonTemp')
    json = JSON.parse(json)
    console.log(json)
    this.goodCommentNum = json.goodCommentNum
    this.badCommentNum = json.badCommentNum
    this.badCommentText = json.badCommentText
  }
}
</script>

<style>
.table-title {
  text-align: center;
  padding: 10px 0;
  border: 1px solid #eee;
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
</style>