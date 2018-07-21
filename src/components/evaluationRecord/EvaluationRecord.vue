<template>
  <div>
    <div class="vux-demo">
      <!--<img class="logo" src="../../assets/vux_logo.png">-->
      <!--<h3>考评记录</h3>-->
      <x-header :right-options="{showMore: true}"
                @on-click-more="showMenus = true">
      </x-header>
    </div>
    <!--<group>-->
      <!--<cell title="考评记录" value="..." is-link link="/personal"></cell>-->
    <!--</group>-->

    <flexbox>
      <flexbox-item><div class="flex-demo">


        <cell
          :title="('考评类型')"
          is-link
          :border-intent="false"
          :arrow-direction="kaoping ? 'up' : 'down'"
          @click.native="kaoping = !kaoping" ></cell>

        <template v-if="kaoping">
          <cell-box :border-intent="false" class="sub-item">全部类型</cell-box>
          <cell-box :border-intent="false" class="sub-item">服务质量评价</cell-box>
          <cell-box :border-intent="false" class="sub-item">工作完成评价</cell-box>
        </template>

      </div></flexbox-item>


      <flexbox-item><div class="flex-demo">

        <cell
          :title="('查看类型')"
          is-link
          :border-intent="false"
          :arrow-direction="chakan ? 'up' : 'down'"
          @click.native="chakan = !chakan" ></cell>

        <template v-if="chakan">
          <cell-box :border-intent="false" class="sub-item">全部</cell-box>
          <cell-box :border-intent="false" class="sub-item">已查看类型</cell-box>
          <cell-box :border-intent="false" class="sub-item">未查看类型</cell-box>
        </template>


      </div></flexbox-item>
      <flexbox-item><div class="flex-demo">


        <cell
          :title="('日期')"
          is-link
          :border-intent="false"
          :arrow-direction="riqi ? 'up' : 'down'"
          @click.native="riqi = !riqi" ></cell>

        <template v-if="riqi">
          <cell-box :border-intent="false" class="sub-item">2018年6月</cell-box>
          <cell-box :border-intent="false" class="sub-item">2018年5月</cell-box>
          <cell-box :border-intent="false" class="sub-item">2018年4月</cell-box>
        </template>


      </div></flexbox-item>
    </flexbox>


    <panel :header="('')" :footer="footer" :list="list" :type="type" @on-img-error="onImgError"></panel>
  </div>
</template>

<script>
  import { Group, Flexbox, FlexboxItem, CellBox, Cell, Panel,XHeader } from 'vux'

  export default {
    name: 'personal',
    components: {
      Group,
      Cell,
      CellBox,
      Flexbox,
      FlexboxItem,
      Panel,
      XHeader
    },
    name: 'Demo',

    data() {
      return {
        msg: 'Welcome to Your Vue.js App',
        kaoping: false,
        chakan: false,
        riqi: false,
        list: [{
          // src: 'http://somedomain.somdomain/x.jpg',
          // fallbackSrc: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          title: '张三的服务质量',
          desc: '评价日期:2018-01-13',
          url: '/evaluationRecord/detail'
        }, {
          // src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          title: '张三的服务质量',
          desc: '评价日期:2018-01-13',
          url: '/evaluationRecord/detail' }]
      }
    },
    methods: {
      onImgError(item, $event) {
        console.log(item, $event)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .vux-demo {
    text-align: center;
  }
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

  .sub-item {
    color: #888;
  }
  .slide {
    padding: 0 20px;
    overflow: hidden;
    max-height: 0;
    transition: max-height .5s cubic-bezier(0, 1, 0, 1) -.1s;
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
