<template>
  <div>
    <div class="vux-demo">
      <img class="logo" src="../assets/vux_logo.png">
      <h1>首页</h1>
    </div>
    <group title="cell demo">
      <cell title="服务质量评价" value="cool" is-link link="Serve"></cell>
      <cell title="工作完成度评价" value="cool" is-link link="Complete"></cell>
    </group>
  </div>
</template>

<script>
import _ from 'lodash'
import moment from 'moment'
import { Group, Cell } from 'vux'

export default {
  components: {
    Group,
    Cell
  },
  data () {
    return {
      // note: changing this line won't causes changes
      // with hot-reload because the reloaded component
      // preserves its current state and we are modifying
      // its initial state.
      msg: 'Hello World!'
    }
  },
  created () {
    const self = this
    self.init()
  },
  methods: {
    init () {
      console.log('init')
      const a = [ 1, 2, 3, 4, 5 ]
      _.each(a, function (i, j) {
        console.log(i, j)
      })
      // const time = moment().format('MMMM Do YYYY, h:mm:ss a'); // 七月 11日 2018, 9:36:25 上午
      const time = moment().format('YYYY-MM-DD hh:mm:ss'); // 2018-07-11 09:41:50
      console.log(time)
    }
  }
}
</script>

<style>
.vux-demo {
  text-align: center;
}
.logo {
  width: 100px;
  height: 100px
}
</style>
