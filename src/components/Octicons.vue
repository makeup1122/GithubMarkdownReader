<!--
 @Author: libing/makeup1122
 @Email: makeup1123@163.com
 @Date: "2020-02-07 22:25:24"
-->
<template>
  <svg
    version="1.1"
    class="octicon mx-1"
    viewBox="0 0 16 16"
    aria-hidden="true"
    v-html="octicons[name].path"
    :height="height"
    :width="height">
  </svg>
</template>
<script>
import octicons from '@primer/octicons'
import '@primer/octicons/build/build.css'
export default {
  name: 'Octicons',
  props: {
    name: String,
    small: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      octicons
    }
  },
  computed: {
    height: function() {
      return this.small ? '18' : '25'
    },
    width: function() {
      return this.small ? '18' : '25'
    }
  }
}
</script>
<style scoped>
</style>
