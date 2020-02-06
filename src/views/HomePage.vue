<!-- Home -->
<template>
    <v-container>
      <HomeBar/>
      <v-row align="center" justify="center">
        <v-col>
          <v-text-field
          solo
          autofocus
          required
          label="Github Repo URL"
          v-model="repoUrl"
          append-icon="mdi-magnify"
          @click:append="readerHandle(repoUrl)"></v-text-field>
          <v-tabs v-model="typeIndex">
            <v-tab>Trend</v-tab>
            <v-tab>History</v-tab>
          </v-tabs>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
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
export default {
  name: 'HomePage',
  components: { HomeBar, HomeGithubTrend, HomeHistory },
  mixins: [ MixinRepo ],
  data: function () {
    return {
      repoUrl: '',
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
    },
    readerHandle: function(repoUrl) {
      if (repoUrl === '' || repoUrl === null) {
        alert('不能为空！')
      } else {
        this.$router.push({ name: 'Reader', query: { r: repoUrl } })
      }
    }
  }
}
</script>
<style>
.v-btn{
  text-transform:none;
}
.textOVerThree {
    display: -webkit-box;
    height: 65px;
    overflow: hidden;
    white-space: normal !important;
    text-overflow: ellipsis;
    word-wrap: break-word;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical
}
</style>
