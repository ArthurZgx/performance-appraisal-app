<!-- 考评记录  -->
<template>
  <div>
      <x-header :right-options="{showMore: false}"
                @on-click-more="showMenus = true"
                right-options.showMore="false">
                考评记录
      </x-header>
      <group>
      <cell title="已评价" is-link :link="{name:'evaluationRecord',params:{type:'alreadySubmit'}}">
        <img src="../../assets/alreadySubmit.png" slot="icon" style="width:40px;height:40px;padding-right:10px;margin-top:5px;">
      </cell>
        <cell title="待评价" is-link :link="{name:'evaluationRecord',params:{type:'inSubmit'}}">
          <img src="../../assets/inSubmit.png" slot="icon" style="width:40px;height:40px;padding-right:10px;margin-top:5px;">
        </cell>
      <cell title="已过期" is-link :link="{name:'evaluationRecord',params:{type:'pastSubmit'}}">
        <img src="../../assets/pastSubmit.png" slot="icon" style="width:40px;height:35px;padding-right:10px;margin-top:7px;">
      </cell>
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
