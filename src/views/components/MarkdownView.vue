<!--
 @Author: libing/makeup1122
 @Email: makeup1123@163.com
 @Date: "2020-02-06 19:38:41"
-->
<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" id="readerwrap">
        <v-progress-circular v-if="markdown === ''" indeterminate color="primary"></v-progress-circular>
        <div v-else v-html="markdown"></div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
import { getBlob } from '@/api/github.js'
const marked = require('marked')
export default {
  name: 'MarkdownView',
  components: {},
  props: {
    value: {
      type: Object,
      default: () => {
        return { path: '' }
      }
    },
    branche: {
      type: Object,
      default: () => { return { name: '' } }
    },
    trees: {
      type: Object,
      default: () => {
        return { tree: [] }
      }
    }
  },
  data: function () {
    return {
      markdownStr: '',
      markdown: ''
    }
  },
  watch: {
    value: function(newVal) {
      this.fetchBlob()
    }
  },
  computed: {
    ...mapGetters([
      'owner',
      'repo'
    ]),
    path: function() {
      let index = this.value.path.lastIndexOf('/')
      return this.value.path.substring(0, index + 1)
    }
  },
  methods: {
    getRawUrl: function(src) {
      return this.$route.query.r + '/blob/' + this.branche.name + '/' + this.path + src + '?raw=true'
    },
    fetchBlob: function() {
      const patt = /.md$/i
      if (patt.test(this.value.path)) {
        this.markdown = ''
        getBlob(this.owner, this.repo, this.value.sha).then(res => {
          this.markdownStr = res
          // eslint-disable-next-line
          this.markdown = marked(res)
        }).then(() => {
          this.processMd()
        })
      }
    },
    processMd: function() {
      const _that = this
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
              // console.log(hrefOrigin)
              const href = /^.\//.test(hrefOrigin) ? hrefOrigin.substring(2) : hrefOrigin
              const i = href.lastIndexOf('#')
              let path = ''
              if (i === -1) {
                path = decodeURIComponent(_that.path + href)
              } else {
                path = decodeURIComponent(_that.path + href.substring(0, i))
              }
              console.log(_that.trees.tree)
              const b = _that.trees.tree.find(e => e.path === path)
              if (b) _that.$emit('input', b)
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
    }
  }
}
</script>
