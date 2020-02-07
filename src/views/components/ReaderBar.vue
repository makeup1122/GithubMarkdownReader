<!-- AppBar -->
<template>
  <div>
    <v-app-bar flat app dense fixed clipped>
      <v-app-bar-nav-icon @click="$store.commit('changeDrawerLeft')">
        <Octicons name="three-bars"/>
      </v-app-bar-nav-icon>
      <v-toolbar-title class="body-1">
        <a :href="$route.query.r" target="_blank" rel="noopener noreferrer" style="text-decoration:none;">
          {{owner}}/{{repo}}
          <Octicons name="link"/>
        </a>
        </v-toolbar-title>
      <v-spacer></v-spacer>
      <RepoSearch class="hidden-sm-and-down" />
      <v-btn icon text :to="{ name: 'HomePage'}">
        <Octicons name="home"/>
      </v-btn>
      <v-btn icon text @click="$store.commit('changeDrawerRight')">
        <Octicons name="settings"/>
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
