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
          @click.native="kaoping = !kaoping,chakan = false,riqi = false" ></cell>
        <!-- <template v-if="kaoping">
          <cell-box :border-intent="false" class="sub-item">全部类型</cell-box>
          <cell-box :border-intent="false" class="sub-item">服务质量评价</cell-box>
          <cell-box :border-intent="false" class="sub-item">工作完成评价</cell-box>
        </template> -->
      </div></flexbox-item>
      <flexbox-item><div class="flex-demo">
        <cell
          :title="('查看类型')"
          is-link
          :border-intent="false"
          :arrow-direction="chakan ? 'up' : 'down'"
          @click.native="chakan = !chakan,kaoping = false, riqi = false" ></cell>

        <!-- <template v-if="chakan">
          <cell-box :border-intent="false" class="sub-item">全部</cell-box>
          <cell-box :border-intent="false" class="sub-item">已查看类型</cell-box>
          <cell-box :border-intent="false" class="sub-item">未查看类型</cell-box>
        </template> -->
      </div></flexbox-item>
      <flexbox-item><div class="flex-demo">


        <cell
          :title="('日期')"
          is-link
          :border-intent="false"
          :arrow-direction="riqi ? 'up' : 'down'"
          @click.native="riqi = !riqi,kaoping = false,chakan = false" ></cell>

        <!-- <template v-if="riqi">
          <cell-box :border-intent="false" class="sub-item">2018年6月</cell-box>
          <cell-box :border-intent="false" class="sub-item">2018年5月</cell-box>
          <cell-box :border-intent="false" class="sub-item">2018年4月</cell-box>
        </template> -->
      </div></flexbox-item>
    </flexbox>
    <!-- 判断点击菜单类型,显示选择栏 -->
    <!-- 显示考评类型 -->
    <group v-if="kaoping">
      <radio v-model="r1" :options="radio001" :selected-label-style="{color:'#3891F0'}"></radio>
    </group>
    <!-- 显示查看类型 -->
    <group v-if="chakan">
      <radio v-model="r2" :options="radio002" :selected-label-style="{color:'#3891F0'}"></radio>
    </group>
    <group v-if="riqi">
      <flexbox>
        <!-- 显示年份 -->
        <flexbox orient="vertical" :gutter="0">
          <flexbox-item  v-for="(item,index) in years" :key="index">
            <cell :title="item+'年'" is-link :style="selectedYearIndex==index?'color:#3891F0;':''"  @click.native="selectedYearIndex=index"></cell>
          </flexbox-item>         
        </flexbox>
        <!-- 显示月份 -->
          <flexbox orient="vertical" :style="'height:'+years.length*44+'px;overflow:scroll;background:#eee;'" :gutter="0">
          <flexbox-item  v-for="(item,index) in month" :key="index">
            <cell :title="item+'月'" :style="selectedMouthIndex==index?'color:#3891F0;':''" @click.native="selectedMouthIndex=index"></cell>
          </flexbox-item>         
        </flexbox>
      </flexbox>
    </group>
    <!-- 选中菜单栏设置半透明蒙版 -->
    <div class="mask" v-if="riqi||chakan||kaoping" @click="riqi=false,chakan = false, kaoping = false"></div>
    
    <!-- 显示考评信息 -->
    <panel :header="('')" :list="list" :type="type" @on-img-error="onImgError">
    </panel>
    
  </div>
</template>

<script>
  import { Group, Flexbox, FlexboxItem, CellBox, Cell, Panel, XHeader, Radio } from 'vux'

  export default {
    name: 'personal',
    components: {
      Group,
      Cell,
      CellBox,
      Flexbox,
      FlexboxItem,
      Panel,
      XHeader,
      Radio
    },
    data() {
      return {
        r1: '全部类型',
        r2: '全部',
        msg: 'Welcome to Your Vue.js App',
        kaoping: false,
        chakan: false,
        riqi: false,
        radio001: ['全部类型', '服务质量评价', '工作完成评价'],
        radio002: ['全部', '已查看类型', '未查询类型'],
        radio003: ['2018年5月', '2018年6月', '2018年7月'],
        years: ['2018', '2017', '2016', '2015'],
        month: ['8', '7', '6', '5', '4', '3'],
        selectedYearIndex: 0,
        selectedMouthIndex: 0,
        type: '1',
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
          url: '/evaluationRecord/detail'
        }, {
          // src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          title: '张三的服务质量',
          desc: '评价日期:2018-01-13',
          url: '/unsubmittedEvaluation'
        }, {
          // src: 'http://placeholder.qiniudn.com/60x60/3cc51f/ffffff',
          title: '张三的服务质量',
          desc: '评价日期:2018-01-13',
          url: '/unsubmittedEvaluation/detail' }]
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
  z-index: 1000;
}
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

.sub-item {
  color: #888;
}
.slide {
  padding: 0 20px;
  overflow: hidden;
  max-height: 0;
  transition: max-height 0.5s cubic-bezier(0, 1, 0, 1) -0.1s;
}
.mask {
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
  z-index: 100;
}
@import '~vux/src/styles/1px.less';
.flex-demo {
  width: 33;
  text-align: center;
  color: #333;
  /* background-color: rgba(242, 242, 242, 1); */
  border-radius: 4px;
  background-clip: padding-box;
}
</style>
