<!-- Home -->
<template>
    <v-container>
      <HomeBar/>
      <v-row align="center" justify="center">
        <v-col>
          <RepoSearch :solo="true" :autofocus="true"/>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-tabs v-model="typeIndex">
            <v-tab>Trend</v-tab>
            <v-tab>History</v-tab>
          </v-tabs>
          <component v-bind:is="typeCate[typeIndex]"></component>
        </v-col>
      </v-row>
    </v-container>
</template>
<script>
import MixinRepo from '@/mixins/repo.js'
import * as API from '@/api/github.js'
import HomeBar from './components/HomeBar.vue'
import HomeGithubTrend from './components/HomeGithubTrend.vue'
import HomeHistory from './components/HomeHistory.vue'
import RepoSearch from './components/RepoSearch.vue'
export default {
  name: 'HomePage',
  components: { HomeBar, RepoSearch, HomeGithubTrend, HomeHistory },
  mixins: [ MixinRepo ],
  data: function () {
    return {
      history: [
        'https://github.com/kon9chunkit/GitHub-Chinese-Top-Charts',
        'https://github.com/heibaiying/Full-Stack-Notes',
        'https://github.com/heibaiying/BigData-Notes',
        'https://github.com/getify/You-Dont-Know-JS',
        'https://github.com/CyC2018/CS-Notes',
        'https://github.com/jackfrued/Python-100-Days',
        'https://github.com/xingshaocheng/architect-awesome'
      ],
      historyItems: [],
      typeIndex: null,
      typeCate: [
        'HomeGithubTrend',
        'HomeHistory'
      ]
    }
  },
  mounted: function() {
  },
  computed: {
  },
  methods: {
    getRepoInfo: function() {
      const _that = this
      this.history.forEach(e => {
        const owner = this.getOwner(e)
        const repo = this.getRepo(e)
        API.getRepoInfo(owner, repo).then(res => {
          _that.historyItems.push(res.data)
        })
      })
    }
  }
}
</script>
<style>
</style>
