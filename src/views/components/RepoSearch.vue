<!--
 @Author: libing/makeup1122
 @Email: makeup1123@163.com
 @Date: "2020-02-07 15:30:50"
-->
<template>
  <v-text-field
  :solo="solo"
  :autofocus="autofocus"
  hide-details
  required
  label="Search or Github Repo URL"
  v-model="repoUrl"
  prepend-inner-icon="mdi-magnify"
  v-on:keyup.enter="readerHandle(repoUrl)">
    <template slot="prepend-inner">
      <Octicons small name="search"/>
    </template>
  </v-text-field>
</template>
<script>
export default {
  name: 'RepoSearch',
  components: {},
  props: {
    autofocus: {
      type: Boolean,
      default: false
    },
    solo: {
      type: Boolean,
      default: false
    }
  },
  data: function () {
    return {
      repoUrl: ''
    }
  },
  created: function () {

  },
  computed: {},
  methods: {
    readerHandle: function(s) {
      if (s === '' || s === null) {
        alert('不能为空！')
      } else {
        if (/^https:\/\/github.com\/\w+\/\w+/.test(s)) {
          this.$store.commit('setRepoUrl', s)
          this.$router.push({ name: 'Reader', query: { r: s } })
        } else {
          window.open(`https://github.com/search?q=${s}&ref=opensearch`)
        }
      }
    }
  }
}
</script>
<style scoped>
</style>
