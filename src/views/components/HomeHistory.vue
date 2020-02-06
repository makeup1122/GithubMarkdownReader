<!--
 @Author: libing/makeup1122
 @Email: makeup1123@163.com
 @Date: "2020-02-05 11:09:23"
-->
<template>
  <v-container class="pa-0">
    <v-row dense>
      <v-col cols="12" sm="6" md="4" lg="3" xl="2" v-for="item in items" :key="item.node_id">
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
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import MixinRepo from '@/mixins/repo.js'
import Storage from '@/utils/storage.js'
import { getRepoInfo } from '@/api/github.js'
export default {
  name: 'HomeHistory',
  components: {},
  mixins: [ MixinRepo ],
  data: function () {
    return {
      history: [],
      items: []
    }
  },
  created: function () {
    this.history = Storage.getItem('history')
  },
  mounted: function() {
    this.fetchData()
  },
  computed: {},
  methods: {
    fetchData: function() {
      if (this.history === null) {
        this.items = []
      } else {
        const _that = this
        this.history.forEach(e => {
          const owner = this.getOwner(e)
          const repo = this.getRepo(e)
          getRepoInfo(owner, repo).then(res => {
            _that.items.push(res.data)
          })
        })
      }
    }
  }
}
</script>
<style scoped>
</style>
