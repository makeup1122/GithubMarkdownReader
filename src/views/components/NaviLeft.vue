<!-- NaviLeft -->
<template>
  <v-navigation-drawer app v-model="drawerStatus">
    <slot></slot>
  </v-navigation-drawer>
</template>
<script>
export default {
  name: 'NaviLeft',
  computed: {
    drawerStatus: {
      get: function() {
        return this.$store.state.drawerLeft
      },
      set: function(newVal) {
        this.$store.commit('changeDrawerLeft', newVal)
      }
    }
  }
}
</script>
<style scoped>
</style>
