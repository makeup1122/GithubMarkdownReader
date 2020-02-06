<!--
 @Author: libing/makeup1122
 @Email: makeup1123@163.com
 @Date: "2020-02-06 17:06:32"
-->
<template>
  <div>
    <v-btn @click="open">打开</v-btn>
    <v-btn @click="add">添加</v-btn>
  </div>
</template>
<script>
import IndexedDB from '@/utils/IndexedDB.js'
export default {
  name: 'Test',
  components: {},
  data: function () {
    return {
    }
  },
  created: function () {

  },
  computed: {},
  methods: {
    open() {
      IndexedDB.open()
    },
    add() {
      IndexedDB.add()
    }
  }
}
</script>
<style scoped>
</style>
