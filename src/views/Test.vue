<!--
 @Author: libing/makeup1122
 @Email: makeup1123@163.com
 @Date: "2020-02-08 11:15:23"
-->
<template>
  <div></div>
</template>
<script>
import cheerio from 'cheerio'
import { trend } from '@/api/github.js'
export default {
  name: 'TestCheerio',
  components: {},
  data: function () {
    return {
      html: `
      <ul id="fruits">
  <li class="apple">Apple</li>
  <li class="orange">Orange</li>
  <li class="pear">Pear</li>
</ul>`
    }
  },
  created: function () {
    trend().then(res => {
      console.log(res)
    })
  },
  mounted: function() {
    const $ = cheerio.load(this.html)
    $('.apple').attr('id', 'favorite').html()
  },
  computed: {},
  methods: {}
}
</script>
<style scoped>
</style>
