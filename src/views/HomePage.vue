<!-- Home -->
<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <v-text-field required type="url" label="Repo url"  v-model="repoUrl" append-outer-icon="mdi-magnify" @click:append-outer="readerHandle(repoUrl)"></v-text-field>
      </v-col>
      <v-col>
        <v-list>
          <v-list-item @click="readerHandle(item.html_url)" two-line v-for="item in historyItems" :key="item.node_id">
            <v-list-item-content>
              <v-list-item-title class="title">{{item.owner.login}}/{{item.name}}</v-list-item-title>
              <v-list-item-subtitle>
              <v-btn-toggle dense>
                <v-btn x-small>
                  <v-icon small>mdi-star</v-icon>star
                </v-btn>
                <v-btn x-small>{{item.stargazers_count}}</v-btn>
              </v-btn-toggle></v-list-item-subtitle>
              {{item.description}}
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon :href="item.html_url" target="_blank"><v-icon>mdi-launch</v-icon></v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import MixinRepo from '@/mixins/repo.js'
import * as API from '@/api/github.js'
export default {
  name: 'HomePage',
  components: {},
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
      historyItems: []
    }
  },
  mounted: function() {
    this.getRepoInfo()
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
<style scoped>
</style>
