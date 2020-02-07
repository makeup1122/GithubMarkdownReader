<!--
 @Author: libing/makeup1122
 @Email: makeup1123@163.com
 @Date: "2020-02-05 11:09:23"
-->
<template>
  <v-container class="pa-0">
    <v-row dense>
      <v-col cols="12" sm="6" md="4" lg="3" xl="2" v-for="item in items" :key="item.node_id">
        <RepoCard :item="item"></RepoCard>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Storage from '@/utils/storage.js'
import { getRepoInfo } from '@/api/github.js'
import RepoCard from './RepoCard.vue'
export default {
  name: 'HomeHistory',
  components: { RepoCard },
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
