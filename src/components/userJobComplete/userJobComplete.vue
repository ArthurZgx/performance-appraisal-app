<!-- 个人工作完成记录记录 -->
<template>
    <div>
      <x-header :right-options="{showMore: true}"
                @on-click-more="showMenus = true">
                个人工作完成度评价
      </x-header>
      <group>
          <cell v-for="(alist,index) in list" :key="index" :title="alist.taskName" is-link :link="{name:'userJobCompleteResult',params:{id:alist.id}}"></cell>
      </group>
    </div>
</template>

<script>
import { Group, Cell, XHeader } from 'vux'
import request from '../../../src/utils/request.js'
export default {
  data() {
    return {
      list: []
    }
  },
  components: {
    Group,
    Cell,
    XHeader
  },
  methods: {
    getDatas() {
      //   获取数据
      var userId = localStorage.getItem('userId')
      var filter = "{'main_job_detail':{'status':{equalTo:'2'},'user_id':{equalTo:'" + userId + "'}}}"
      request('main_job_details', {
        params: {
          filters: filter
        }
      }).then(res => {
        console.log(res)
        this.list = res.data
      })
    }

  },
  mounted() {
    this.getDatas()
  }
}
</script>

<style scoped>

</style>