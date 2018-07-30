<!--  -->
<template>
  <div>
      <x-header :right-options="{showMore: true}"
                @on-click-more="showMenus = true">
                考评记录
      </x-header>
      <group>
      <cell title="已提交评价" is-link link="evaluationRecord"></cell>
      <cell title="已过期评价" is-link link="evaluationRecord"></cell>
      <cell title="还在考评周期内" is-link link="evaluationRecord"></cell>
    </group>
  </div>
</template>

<script>
import { Group, Cell, XHeader } from 'vux'
export default {
  data() {
    return {
    }
  },

  components: {
    Group,
    Cell,
    XHeader
  },

  computed: {},

  methods: {}
}

</script>
<style scoped>
</style>