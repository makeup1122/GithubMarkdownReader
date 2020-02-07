<!-- RepoBranches -->
<template>
  <v-select :loading="loading" filled prepend-inner-icon="mdi-directions-fork" @input="inputHandle" :value="value" :items="branches" item-text="name" return-object></v-select>
</template>

<script>
import { getBranches } from '@/api/github.js'
export default {
  name: 'RepoBranches',
  props: {
    value: {
      type: Object,
      default: () => {
        return null
      }
    }
  },
  data: function () {
    return {
      branches: [],
      loading: true
    }
  },
  computed: {
    repoUrl: function() {
      return this.$store.state.repoUrl
    }
  },
  watch: {
    repoUrl: function(newVal) {
      this.fetchData()
    }
  },
  mounted: function () {
    this.fetchData()
  },
  methods: {
    fetchData: function() {
      if (this.$store.getters.owner && this.$store.getters.repo) {
        getBranches(this.$store.getters.owner, this.$store.getters.repo).then(res => {
          this.branches = res.data
          this.loading = false
          this.$emit('input', this.branches[0])
        })
      }
    },
    inputHandle: function(e) {
      this.$emit('input', e)
    }
  }
}
</script>
<style scoped>
</style>
