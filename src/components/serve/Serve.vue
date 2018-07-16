<template>
  <div>
    <x-header :right-options="{showMore: true}" @on-click-more="showMenus = true">绩效考评</x-header>
    <group title="cell demo">
      <cell title="返回首页" value="cool" is-link link="/"></cell>
    </group>
  </div>
</template>

<script>
import { Group, Cell, XHeader } from 'vux'

export default {
  name: 'serve',
  components: {
    Group,
    Cell,
    XHeader
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
