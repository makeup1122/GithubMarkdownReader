<template>
  <v-app >
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer>
      <v-spacer></v-spacer>
      <div>
        &copy; {{ new Date().getFullYear() }}
        &nbsp;&nbsp;&nbsp;&nbsp;
        <v-icon small color="red">mdi-heart</v-icon>&nbsp;By
        <v-btn text class="pa-0" href="https://goingmerry.cn/" target="_blank">makeup1122</v-btn>
      </div>
      <v-spacer></v-spacer>
    </v-footer>
  </v-app>
</template>
<script>
export default {
  name: 'App'
}
</script>
<style>
.v-tab,
.v-btn{
text-transform: none !important;
}
</style>
