<!-- NaviRight -->
<template>
  <v-navigation-drawer app right v-model="drawerStatus" disable-resize-watcher>
    <v-container>
      <v-row>
        <v-col>
          <Settings></Settings>
        </v-col>
      </v-row>
    </v-container>
  </v-navigation-drawer>
</template>
<script>
import Settings from '@/components/Settings.vue'
export default {
  name: 'NaviRight',
  components: { Settings },
  computed: {
    drawerStatus: {
      get: function() {
        return this.$store.state.drawerRight
      },
      set: function(newVal) {
        this.$store.commit('changeDrawerRight', newVal)
      }
    }
  }
}
</script>
