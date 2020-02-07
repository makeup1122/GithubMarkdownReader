<!--
 @Author: libing/makeup1122
 @Email: makeup1123@163.com
 @Date: "2020-02-04 21:20:56"
-->
<template>
  <v-app-bar elevate-on-scroll app dense>
    <div class="pr-3">
      <v-img :src="require('@/assets/logo.png')" height="100%" width="30"></v-img>
    </div>
    <v-toolbar-title class="title">
      {{title}}
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon text href="https://github.com/makeup1122/GithubMarkdownReader" target="_blank">
      <Octicons name="mark-github"/>
    </v-btn>
  </v-app-bar>
</template>
<script>
export default {
  name: 'HomeBar',
  computed: {
    title: function() {
      return process.env.VUE_APP_TITLE
    }
  }
}
</script>
<style scoped>
</style>
