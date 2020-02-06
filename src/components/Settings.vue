<!-- Settings -->
<template>
  <v-switch inset v-model="darkTheme" :label="darkTheme ? '夜晚' : '白天'" ></v-switch>
</template>
<script>
export default {
  name: 'NaviRight',
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
  }
}
</script>
