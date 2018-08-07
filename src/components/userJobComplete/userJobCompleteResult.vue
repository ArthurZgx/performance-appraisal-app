<!-- 查看个人任务完成详情 -->
<template>
    <div>
      <x-header :right-options="{showMore: true}"
                @on-click-more="showMenus = true">
                个人工作完成度评价
      </x-header>
      <group>
      <x-table full-bordered style="background-color:#fff;width:90%;margin: 20px auto;color:#333;"> 
          <tbody>
          <tr>
            <td>任务名称</td>
            <td>{{result.taskName}}</td>
          </tr>
          <tr>
              <td>任务内容</td>
            <td>{{result.planContent}}</td>
          </tr>
          <tr>
              <td>权重</td>
              <td>{{result.weights}}%</td>
          </tr>
          <tr>
              <td>考评</td>
              <td>{{result.judge}}%</td>
          </tr>
          <tr>
              <td>最终得分</td>              
              <td>{{result.scoreScore}}</td>
          </tr>
          </tbody>
      </x-table>
      </group>
    </div>
</template>

<script>
import { Group, Cell, XHeader, XTable } from 'vux'
import request from '../../../src/utils/request.js'
export default {
  data() {
    return {
      result: {}
    }
  },
  components: {
    XHeader,
    Group,
    Cell,
    XTable
  },
  methods: {
    getDatas() {
      //   获取数据
      var userId = localStorage.getItem('userId')
      var filter = "{'main_job_detail':{'status':{equalTo:'2'},'user_id':{equalTo:'" + userId + "'},,'id':{equalTo:'" + this.$route.params.id + "'}}}"
      request('main_job_details', {
        params: {
          filters: filter
        }
      }).then(res => {
        this.result = res.data[0]
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