<!--  -->
<template>
<div>
  <ReaderBar/>
  <NaviLeft>
    <RepoBranches :value="branche" @input="brancheHandle"></RepoBranches>
    <RepoTree :root-tree="rootTree"  @input="activeHandle"></RepoTree>
  </NaviLeft>
  <NaviRight/>
  <MarkdownView v-model="active" :trees="trees" :branche="branche"></MarkdownView>
</div>
</template>
<script>
import { mapGetters } from 'vuex'
import * as API from '@/api/github.js'
import RepoBranches from './components/RepoBranches.vue'
import RepoTree from './components/RepoTree.vue'
import ReaderBar from './components/ReaderBar.vue'
import NaviRight from './components/ReaderNaviRight.vue'
import NaviLeft from './components/ReaderNaviLeft.vue'
import MarkdownView from './components/ReaderMarkdownView.vue'
export default {
  name: 'Reader',
  components: { RepoBranches, ReaderBar, NaviRight, RepoTree, NaviLeft, MarkdownView },
  data: function () {
    return {
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
    if (/^https:\/\/github.com\/\w+\/\w+/.test(this.$route.query.r)) {
      this.$store.commit('setRepoUrl', this.$route.query.r)
    } else {
      alert('错误的github地址！')
    }
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
    }
  }
}
</script>
