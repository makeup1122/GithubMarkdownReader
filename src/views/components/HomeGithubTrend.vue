<!--
 @Author: libing/makeup1122
 @Email: makeup1123@163.com
 @Date: "2020-02-04 21:27:48"
-->
<template>
  <v-container class="pa-0">
    <v-row dense>
      <v-col cols="6" sm="6" md="4" lg="3" xl="2" >
        <v-select
        dense
        solo
        :loading="trendSearchLoading"
        @change="getTrend"
        :items="dateItems"
        v-model="trendSearchCreated"></v-select>
      </v-col>
      <v-col cols="6" sm="6" md="4" lg="3" xl="2" >
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
    </v-row>
    <v-row dense>
      <v-col cols="12" sm="6" md="4" lg="3" xl="2" v-for="item in items" :key="item.node_id">
        <v-card hover :to="{ name: 'Reader', query: { r: item.html_url}}">
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
import * as API from '@/api/github.js'
import * as DD from '@/utils/date.js'
import Language from '@/services/github-language.js'
export default {
  name: 'HomeGithubTrend',
  components: {},
  data: function () {
    return {
      items: [],
      trend: [],
      trendSearchLanguage: 'markdown',
      trendSearchCreated: DD.weekBegin(),
      trendSearchLoading: false
    }
  },
  created: function () {
    this.getTrend()
  },
  computed: {
    languageItems: () => { return Language.map(e => e.name) },
    dateItems: function() {
      return [
        { text: '今日', value: DD.todayBegin() },
        { text: '本周', value: DD.weekBegin() },
        { text: '本月', value: DD.monthBegin() },
        { text: '本年', value: DD.yearBegin() }
      ]
    },
    q: function() {
      // language:markdown+created:>2020-01-01
      return 'created:>=' + this.trendSearchCreated + (this.trendSearchLanguage ? ('+language:' + this.trendSearchLanguage) : '')
    }
  },
  methods: {
    getTrend: function() {
      this.trendSearchLoading = true
      API.search(this.q).then(res => {
        this.items = this.trend = res.data.items
      }).finally(() => {
        this.trendSearchLoading = false
      })
    }
  }
}
</script>
<style scoped>
</style>
