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
          <v-tabs v-model="typeIndex" dense>
            <v-tab class="title"><Octicons small name="flame"/>Trend</v-tab>
            <v-tab class="title"><Octicons small name="history"/>History</v-tab>
          </v-tabs>
          <keep-alive>
            <component v-bind:is="typeCate[typeIndex]"></component>
          </keep-alive>
        </v-col>
      </v-row>
    </v-container>
</template>
<script>
import HomeBar from './components/HomeBar.vue'
import GithubTrend from './components/GithubTrend.vue'
import HomeHistory from './components/HomeHistory.vue'
import RepoSearch from './components/RepoSearch.vue'
export default {
  name: 'HomePage',
  components: { HomeBar, RepoSearch, GithubTrend, HomeHistory },
  data: function () {
    return {
      recommends: [
        'https://github.com/kon9chunkit/GitHub-Chinese-Top-Charts',
        'https://github.com/heibaiying/Full-Stack-Notes',
        'https://github.com/heibaiying/BigData-Notes',
        'https://github.com/getify/You-Dont-Know-JS',
        'https://github.com/CyC2018/CS-Notes',
        'https://github.com/jackfrued/Python-100-Days',
        'https://github.com/xingshaocheng/architect-awesome'
      ],
      typeIndex: 0,
      typeCate: [
        'GithubTrend',
        'HomeHistory'
      ]
    }
  },
  created: function() {
  },
  mounted: function() {
    // this.typeIndex = parseInt(Cookie.getToken('GMR_type_index'))
  },
  computed: {
  },
  methods: {
  }
}
</script>
<style>
</style>
