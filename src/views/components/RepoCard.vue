<!--
 @Author: libing/makeup1122
 @Email: makeup1123@163.com
 @Date: "2020-02-07 21:10:57"
-->
<template>
  <v-card hover :to="{ name: 'Reader', query: { r: item.html_url}}">
    <v-card-title>
      <p class="d-inline-block text-truncate">{{item.full_name}}</p>
    </v-card-title>
    <v-card-subtitle class="pb-1">
      <Octicons small v-if="item.language" name="file"/>{{item.language}}
      <Octicons small name="star"/>{{item.stargazers_count}}
      <Octicons small name="repo-forked"/>{{item.forks_count}}
    </v-card-subtitle>
    <v-card-text>
      <p class="text-over-three">{{item.description}}</p>
    </v-card-text>
    <v-card-actions>
      <v-btn :href="item.html_url" target="_blank"><Octicons small name="mark-github"/>Github</v-btn>
      <v-btn :to="{ name: 'Reader', query: { r: item.html_url}}"><Octicons small name="book"/>Read</v-btn>
    </v-card-actions>
  </v-card>
</template>
<script>
export default {
  name: 'RepoCard',
  props: {
    item: {
      type: Object,
      require: true
    }
  }
}
</script>
<style>
.text-over-three{
  margin-bottom: 0px !important;
  height: 60px;
  font-size: 14px;
  line-height: 20px;
  word-break: break-all;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}
</style>
