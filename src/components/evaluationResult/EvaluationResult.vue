<template>
  <div>
    <div class="vux-demo">
      <x-header :right-options="{showMore: true}"
                @on-click-more="showMenus = true">
      </x-header>
      <!--<img class="logo" src="../../assets/vux_logo.png">-->
      <!--<h3>考评结果</h3>-->
    </div>
    <!--<group title="cell demo">-->
      <!--<cell title="返回首页" value="cool" is-link link="/personal"></cell>-->
    <!--</group>-->
    <load-more tip="" :show-loading="false" background-color="#fbf9fe"></load-more>
    <x-table :cell-bordered="false" style="background-color:#fff;">
      <thead>
      <tr>
        <td colspan="5">本人的考评结果</td>
      </tr>
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
  import { Group, Cell,XHeader,XTable,LoadMore } from 'vux'

  export default {
    name: 'Demo',
    components: {
      Group,
      Cell,
      XHeader,
      XTable,
      LoadMore
    },
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  h1, h2 {
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
</style>
