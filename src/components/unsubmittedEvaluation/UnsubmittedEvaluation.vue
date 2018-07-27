<template>
  <div>
    <div class="vux-demo">
      <x-header :right-options="{showMore: true}"
                @on-click-more="showMenus = true">
        绩效考评
      </x-header>
      <img class="logo" src="../../assets/vux_logo.png">
      <h3>考评记录</h3>

    </div>

    <x-table :cell-bordered="false" style="background-color:#fff;">
      <thead>
      <tr>
        <th>Product</th>
        <th>Price</th>
        <th>Quantity</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>Apple</td>
        <td>$1.25</td>
        <td> x 1</td>
      </tr>
      <tr>
        <td>Banana</td>
        <td>$1.20</td>
        <td> x 2</td>
      </tr>
      </tbody>
    </x-table>

    <flexbox>
      <flexbox-item><div class="flex-demo">
        <x-button  type="primary"> 保存 </x-button>
        </div>
        </flexbox-item>

      <flexbox-item><div class="flex-demo">
        <x-button  type="primary"> 提交 </x-button>
      </div>
      </flexbox-item>

    </flexbox>

    <br>
  </div>
</template>
<script>
  import { XTable, Cell, FormPreview, XNumber, XTextarea, XInput, XHeader, Icon, XButton, Flexbox, FlexboxItem } from 'vux'
  export default {
    name: 'personal',
    components: {
      FormPreview,
      XHeader,
      Icon,
      XTextarea,
      XNumber,
      Cell,
      XInput,
      XButton,
      Flexbox,
      FlexboxItem,
      XTable
    },
    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        value: '10',
        numberValue: 0
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
    border-bottom:1px dashed #f11
  }
  a {
    color: #42b983;
  }

  @import '~vux/src/styles/1px.less';
  .flex-demo {
    text-align: center;
    color: #333;
    background-color: rgba(242, 242, 242, 1);
    border-radius: 4px;
    background-clip: padding-box;

  }
</style>
