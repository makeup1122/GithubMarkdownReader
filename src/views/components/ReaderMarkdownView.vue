<!--
 @Author: libing/makeup1122
 @Email: makeup1123@163.com
 @Date: "2020-02-06 19:38:41"
-->
<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" id="readerwrap">
        <v-progress-circular v-if="content === ''" indeterminate color="primary"></v-progress-circular>
        <div v-else v-html="content"></div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import { mapGetters } from 'vuex'
import { getReadme, getContent } from '@/api/github.js'
// const marked = require('marked')
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
      content: ''
    }
  },
  watch: {
    value: function() {
      this.fetchData()
    }
  },
  computed: {
    ...mapGetters([
      'owner',
      'repo'
    ]),
    currentPath: function() {
      let index = this.value.path.lastIndexOf('/')
      return this.value.path.substring(0, index + 1)
    }
  },
  methods: {
    getRawUrl: function(src) {
      return this.$route.query.r + '/blob/' + this.branche.name + '/' + this.currentPath + src + '?raw=true'
    },
    fetchData: function() {
      this.content = ''
      if (this.value.path === '') {
        this.fetchReadme()
      } else {
        this.fetchContent()
      }
    },
    fetchReadme: function() {
      getReadme(this.owner, this.repo, this.branche.name).then(res => {
        this.content = res.data
      })
    },
    fetchContent: function() {
      if (/.md$/i.test(this.value.path)) {
        getContent(this.owner, this.repo, this.value.path, this.branche.name).then(res => {
          this.content = res.data
        }).then(() => {
          this.processMd()
        })
      } else if (/.txt$/i.test(this.value.path)) {
        getContent(this.owner, this.repo, this.value.path).then(res => {
          this.content = res
        }).then(() => {
          this.processTxt()
        })
      } else {
        // todo sth
      }
    },
    processTxt: function() {
      // todo
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
            // 绝对URL添加target="_blank"属性
            ele.target = '_blank'
          } else {
            // 相对路径修改点击事件
            ele.addEventListener('click', function(event) {
              // 阻止默认点击事件
              event.preventDefault()
              // 获取href属性
              const hrefOrigin = ele.getAttribute('href')
              // 去掉./目录
              const href = /^.\//.test(hrefOrigin) ? hrefOrigin.substring(2) : hrefOrigin
              // 去掉锚点参数
              const path = decodeURIComponent(_that.currentPath + href.split('#')[0])
              if (path !== '') {
                // 寻找文件对象
                const b = _that.trees.tree.find(e => e.path === path)
                if (b) _that.$emit('input', b)
              }
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
