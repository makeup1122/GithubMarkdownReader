<!--
 @Author: libing/makeup1122
 @Email: makeup1123@163.com
 @Date: "2020-02-07 21:10:57"
-->
<template>
  <v-card hover>
    <v-card-title :to="{ name: 'Reader', query: { r: item.html_url}}">
      <p class="d-inline-block text-truncate" >{{item.full_name}}</p>
    </v-card-title>
    <v-card-subtitle>
      <p>
      <v-icon small v-if="item.language">mdi-alpha-l-box</v-icon>{{item.language}}
      <!-- <v-icon small>mdi-eye</v-icon>{{item.watchers_count}} -->
      <v-icon small>mdi-star</v-icon>{{item.stargazers_count}}
      <!-- <v-icon small>mdi-directions-fork</v-icon>{{item.forks}} -->
      </p>
    </v-card-subtitle>
    <v-card-text  >
      <p class="textOVerThree">{{item.description}}</p>
    </v-card-text>
    <v-card-actions>
      <v-btn small text :href="item.html_url" target="_blank"><v-icon small>mdi-launch</v-icon>Github</v-btn>
      <v-btn small text :to="{ name: 'Reader', query: { r: item.html_url}}"><v-icon>mdi-markdown</v-icon>Read</v-btn>
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
<style scoped>
</style>
