<!--  -->
<template>
  <v-container>
    <v-row>
      <v-col>
        <v-switch inset v-model="darkTheme" :label="darkTheme ? '深色' : '浅色'" ></v-switch>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'NavigationRight',
  components: {},
  data: function () {
    return {
      darkTheme: false
    }
  },
  watch: {
    darkTheme: function(newVal) {
      this.$vuetify.theme.dark = newVal
    }
  },
  computed: {},
  methods: {}
}
</script>
<style scoped>
</style>
