<!-- AppBar -->
<template>
  <div>
    <v-app-bar flat app dense fixed clipped>
      <v-app-bar-nav-icon @click="$store.commit('changeDrawerLeft')"></v-app-bar-nav-icon>
      <v-toolbar-title class="body-1">
        <a :href="$route.query.r" target="_blank" rel="noopener noreferrer" style="text-decoration:none;">
          {{owner}}/{{repo}}<v-icon small>mdi-launch</v-icon>
        </a>
        </v-toolbar-title>
      <v-spacer></v-spacer>
      <RepoSearch class="hidden-sm-and-down" />
      <v-btn icon text :to="{ name: 'HomePage'}">
        <v-icon>mdi-home</v-icon>
      </v-btn>
      <v-btn icon text @click="$store.commit('changeDrawerRight')">
        <v-icon>mdi-settings</v-icon>
      </v-btn>
    </v-app-bar>
  </div>
</template>
<script>
import RepoSearch from './RepoSearch.vue'
export default {
  name: 'AppBar',
  components: { RepoSearch },
  computed: {
    title: function() {
      return process.env.VUE_APP_TITLE
    },
    repo: function() {
      return this.$store.getters.repo
    },
    owner: function() {
      return this.$store.getters.owner
    }
  }
}
</script>
