<template>
  <div>
    <div class="vux-demo">
      <x-header :right-options="{showMore: true}"
                style="box-shadow: 0 2px 10px 0 rgba(0,0,0,0.10);margin-bottom: 15px;"
                @on-click-more="showMenus = true">
                考评结果
      </x-header>
      <!--<img class="logo" src="../../assets/vux_logo.png">-->
      <!--<h3>考评结果</h3>-->
    </div>
    <!--<group title="cell demo">-->
      <!--<cell title="返回首页" value="cool" is-link link="/personal"></cell>-->
    <!--</group>-->
    <!-- <load-more tip="" :show-loading="false" background-color="#fbf9fe"></load-more> -->
    <div class="table-title">本人的考评结果</div>
    <x-table full-bordered style="margin:0 auto;width:90%;">
      <thead>
      <tr>
        <th>考评周期</th>
        <th>服务质量评价系数</th>
        <th>工作完成度系数</th>
        <th>考勤系数</th>
        <th>最终系数</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>2018.06</td>
        <td>90%</td>
        <td>90%</td>
        <td>90%</td>
        <td>72.9%</td>
      </tr>
      <tr>
        <td>2018.06</td>
        <td>90%</td>
        <td>90%</td>
        <td>90%</td>
        <td>72.9%</td>
      </tr>
      <tr>
        <td>2018.06</td>
        <td>90%</td>
        <td>90%</td>
        <td>90%</td>
        <td>72.9%</td>
      </tr>
      <tr>
        <td>2018.06</td>
        <td>90%</td>
        <td>90%</td>
        <td>90%</td>
        <td>72.9%</td>
      </tr>
      <tr>
        <td>2018.06</td>
        <td>90%</td>
        <td>90%</td>
        <td>90%</td>
        <td>72.9%</td>
      </tr>
      <tr>
        <td>2018.06</td>
        <td>90%</td>
        <td>90%</td>
        <td>90%</td>
        <td>72.9%</td>
      </tr>
      </tbody>
    </x-table>

  </div>
</template>

<script>
  import { Group, Cell, XHeader, XTable, LoadMore } from 'vux'

  export default {
    name: 'Demo',
    components: {
      Group,
      Cell,
      XHeader,
      XTable,
      LoadMore
    },
    data() {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.table-title {
  font-weight: bold;
  text-align: center;
  padding: 10px 0;
}
td {
  padding: 0 5px;
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
