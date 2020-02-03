<!-- Home -->
<template>
  <v-container>
    <v-row >
      <v-col>
        <v-text-field autofocus required type="url" label="Repo url"  v-model="repoUrl" append-outer-icon="mdi-magnify" @click:append-outer="readerHandle(repoUrl)"></v-text-field>
      </v-col>
    </v-row>
    <v-row dense>
      <!-- <v-col cols="2">
        <v-select dense solo :items="['今日', '本周', '本月']"></v-select>
      </v-col> -->
      <v-col cols="2">
        <v-combobox
        :loading="trendLoading"
        @change="getTrend"
        dense
        solo
        v-model="trendLanguage"
        :items="['java', 'python', 'c', 'c++', 'vue', 'javascript', 'html', 'css', 'ruby', 'typescript']"></v-combobox>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" md="4" lg="3" xl="2" v-for="item in historyItems" :key="item.node_id">
        <v-card hover @click="readerHandle(item.html_url)">
          <v-card-title>
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
            <v-btn small text><v-icon>mdi-markdown</v-icon>Read</v-btn>
          </v-card-actions>
        </v-card>
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
      historyItems: [],
      trend: [],
      trendLanguage: '',
      trendLoading: false
    }
  },
  mounted: function() {
    // this.getRepoInfo()
    this.getTrend()
  },
  methods: {
    getTrend: function() {
      this.trendLoading = true
      API.search('language:' + this.trendLanguage).then(res => {
        this.historyItems = this.trend = res.data.items
      }).finally(() => {
        this.trendLoading = false
      })
    },
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
