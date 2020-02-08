<!--
 @Author: libing/makeup1122
 @Email: makeup1123@163.com
 @Date: "2020-02-04 21:27:48"
-->
<template>
  <v-container class="pa-0">
    <v-row dense>
      <v-col>
        <v-select
        dense
        solo
        :loading="trendSearchLoading"
        @change="getTrend"
        :items="[{ text: '今日', value: 'daily' }, { text: '本周', value: 'weekly' }, { text: '本月', value: 'monthly' }]"
        v-model="trendSearchSince"></v-select>
      </v-col>
      <v-col >
        <v-combobox
        clearable
        :loading="trendSearchLoading"
        @change="getTrend"
        dense
        placeholder="All"
        solo
        v-model="trendSearchLanguage"
        :items="languageItems"></v-combobox>
      </v-col>
      <v-spacer></v-spacer>
      <v-col>
        <v-btn-toggle v-model="trendType" dense class="blue--text">
          <v-btn>Repositories</v-btn>
          <v-btn disabled>Developers</v-btn>
        </v-btn-toggle>
      </v-col>
    </v-row>
    <v-row dense>
      <v-col cols="12" sm="6" md="4" v-for="item in items" :key="item.node_id">
        <RepoCard :item="item"></RepoCard>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import * as API from '@/api/github.js'
import Language from '@/services/github-language.js'
import RepoCard from './RepoCard.vue'
export default {
  name: 'HomeGithubTrend',
  components: { RepoCard },
  data: function () {
    return {
      items: [],
      trendType: 0,
      trendSearchLanguage: '',
      trendSearchSince: 'daily',
      trendSearchLoading: false
    }
  },
  created: function () {
    this.getTrend()
  },
  computed: {
    languageItems: () => { return Language.map(e => e.name) }
  },
  methods: {
    getTrend: function() {
      this.trendSearchLoading = true
      API.trend(this.trendSearchLanguage, this.trendSearchSince, this.trendType).then(res => {
        this.items = res.data.map(e => {
          return {
            html_url: e.url,
            full_name: e.author + '/' + e.name,
            language: e.language,
            language_color: e.languageColor,
            stargazers_count: e.stars,
            forks_count: e.forks,
            description: e.description
          }
        })
      }).finally(() => {
        this.trendSearchLoading = false
      })
    }
  }
}
</script>
<style scoped>
</style>
