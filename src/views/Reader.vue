<!--  -->
<template>
<div>
  <v-app-bar app dense fixed clipped>
    <v-app-bar-nav-icon @click="drawerLeft = !drawerLeft"></v-app-bar-nav-icon>
    <v-toolbar-title>
      <a :href="$route.query.r" target="_blank" rel="noopener noreferrer" style="text-decoration:none;">
        {{owner}}/{{repo}}
      </a>
      </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon text :to="{ name: 'HomePage'}">
      <v-icon>mdi-home</v-icon>
    </v-btn>
    <v-btn icon text @click="drawerRight = !drawerRight">
      <v-icon>mdi-settings</v-icon>
    </v-btn>
  </v-app-bar>
  <v-navigation-drawer app v-model="drawerLeft">
    <RepoBranches :value="branche" @input="brancheHandle"></RepoBranches>
    <RepoTree :root-tree="rootTree"  @input="activeHandle"></RepoTree>
  </v-navigation-drawer>
  <v-navigation-drawer app right v-model="drawerRight">
    <Settings></Settings>
  </v-navigation-drawer>
  <v-container fluid>
    <v-row>
      <!-- <v-col cols="4">
        <RepoBranches :value="branche" @input="brancheHandle"></RepoBranches>
        <RepoTree :root-tree="rootTree"  @input="activeHandle"></RepoTree>
      </v-col> -->
      <v-col cols="12" id="readerwrap">
        <v-progress-circular v-if="markdown === ''" indeterminate color="primary"></v-progress-circular>
        <div v-else v-html="markdown"></div>
      </v-col>
    </v-row>
  </v-container>
</div>
</template>
<script>
import { mapGetters } from 'vuex'
import * as API from '@/api/github.js'
import RepoBranches from '@/components/RepoBranches.vue'
import RepoTree from '@/components/RepoTree.vue'
import Settings from '@/components/Settings.vue'
const marked = require('marked')
export default {
  name: 'Reader',
  components: { RepoBranches, RepoTree, Settings },
  data: function () {
    return {
      drawerLeft: true,
      drawerRight: false,
      markdownStr: '',
      markdown: '',
      branche: null,
      trees: {
        tree: []
      },
      active: {
        path: ''
      }
    }
  },
  created: function () {
    this.$store.commit('setRepoUrl', this.$route.query.r)
  },
  computed: {
    ...mapGetters([
      'owner',
      'repo'
    ]),
    rootTree: function() {
      const _that = this
      return this.trees.tree.filter(e => !e.path.includes('/')).map(e => {
        if (e.type === 'tree') {
          e.children = _that.fetchChildren(e)
        }
        e.name = e.path.toLowerCase()
        return e
      }).reverse()
    },
    path: function() {
      let index = this.active.path.lastIndexOf('/')
      return this.active.path.substring(0, index + 1)
    }
  },
  methods: {
    fetchChildren: function(item) {
      const _that = this
      return _that.trees.tree.filter(e => {
        const patt = new RegExp('^' + item.path + '/((?!/).)*$')
        return patt.test(e.path)
      }).map(e => {
        if (e.type === 'tree') {
          e.children = _that.fetchChildren(e)
        }
        let index = e.path.lastIndexOf('/')
        e.name = e.path.substring(index + 1).toLowerCase()
        return e
      }).reverse()
    },
    brancheHandle: function(branche) {
      this.branche = branche
      API.getTree(this.owner, this.repo, branche.commit.sha, 1).then(res => {
        this.trees = res.data
        this.activeHandle(this.trees.tree.find(e => e.path === 'README.md'))
      })
    },
    activeHandle: function(blob) {
      this.active = blob
      const _that = this
      const patt = /.md$/i
      if (patt.test(blob.path)) {
        this.markdown = ''
        API.getBlob(this.owner, this.repo, blob.sha).then(res => {
          this.markdownStr = res
          // eslint-disable-next-line
          this.markdown = marked(res)
          const wrap = document.getElementById('readerwrap')
          const a = wrap.getElementsByTagName('a')
          const img = wrap.getElementsByTagName('img')
          this.$nextTick(function() {
            for (let index = 0; index < a.length; index++) {
              const ele = a[index]
              if (ele.getAttribute('href').startsWith('http')) {
                ele.target = '_blank'
              } else {
                ele.addEventListener('click', function(event) {
                  event.preventDefault()
                  const hrefOrigin = ele.getAttribute('href')
                  const href = /^.\//.test(hrefOrigin) ? hrefOrigin.substring(2) : hrefOrigin
                  // console.log(href)
                  const i = href.lastIndexOf('#')
                  let path = ''
                  if (i === -1) {
                    path = decodeURIComponent(_that.path + href)
                  } else {
                    path = decodeURIComponent(_that.path + href.substring(0, i))
                  }
                  const b = _that.trees.tree.find(e => e.path === path)
                  if (b) _that.activeHandle(b)
                })
              }
            }
            for (let index = 0; index < img.length; index++) {
              const ele = img[index]
              const src = ele.getAttribute('src')
              if (!src.startsWith('http')) {
                ele.src = this.getRawUrl(src)
              }
              ele.style = 'max-width:100%'
            }
          })
        })
      }
    },
    getRawUrl: function(src) {
      return this.$route.query.r + '/blob/' + this.branche.name + '/' + this.path + src + '?raw=true'
    }
  }
}
</script>
<style scoped>
</style>
