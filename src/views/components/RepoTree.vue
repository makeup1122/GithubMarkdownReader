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
      <template v-if="item.type === 'tree'">
        <Octicons name="file-directory"/>
      </template>
      <template v-else>
        <Octicons :name="fileIcon(item.path)"/>
      </template>
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
        md: 'markdown',
        pdf: 'file-pdf',
        png: 'file-media',
        jpg: 'file-media',
        jpeg: 'file-media'
      }
    }
  },
  methods: {
    fileIcon: function(fileName) {
      let index1 = fileName.lastIndexOf('.')
      let index2 = fileName.length
      let suffix = fileName.substring(index1 + 1, index2)
      return this.files[suffix] || 'file'
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
