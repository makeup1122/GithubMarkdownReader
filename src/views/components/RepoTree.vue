<!-- RepoTree -->
<template>
<div>
  <v-treeview
  v-if="!loading"
  v-model="selected"
  :active.sync="active"
  :open.sync="open"
  dense
  hoverable
  activatable
  :items="rootTree"
  @update:active="activeHandle"
  return-object
  item-key="path"
  item-text="name"
  open-on-click
  transition
  >
    <template v-slot:prepend="{ item, open }">
      <v-icon v-if="item.type === 'tree'">
        {{ open ? 'mdi-folder-open' : 'mdi-folder' }}
      </v-icon>
      <v-icon v-else>{{ fileIcon(item.path) }}</v-icon>
    </template>
  </v-treeview>
  <v-progress-circular v-if="loading" indeterminate color="primary"></v-progress-circular>
</div>
</template>

<script>
export default {
  name: 'RepoTree',
  components: {},
  props: {
    rootTree: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  computed: {
    loading: function() {
      return this.rootTree.length === 0
    }
  },
  data: function () {
    return {
      open: [],
      active: [],
      selected: [],
      files: {
        html: 'mdi-language-html5',
        js: 'mdi-nodejs',
        json: 'mdi-json',
        md: 'mdi-markdown',
        pdf: 'mdi-file-pdf',
        png: 'mdi-file-image',
        txt: 'mdi-file-document-outline',
        xls: 'mdi-file-excel',
        jpg: 'mdi-image',
        jpeg: 'mdi-image'
      }
    }
  },
  methods: {
    fileIcon: function(fileName) {
      let index1 = fileName.lastIndexOf('.')
      let index2 = fileName.length
      let suffix = fileName.substring(index1 + 1, index2)
      return this.files[suffix] || 'mdi-file-outline'
    },
    activeHandle: function(blobs) {
      if (blobs.length === 1) {
        const blob = blobs[0]
        // if (blob.type === 'blob') {
        this.$emit('input', blob)
        // }
      }
    }
  }
}
</script>
<style scoped>
</style>
