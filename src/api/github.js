'use strict'
import axios from 'axios'
const instance = axios.create({
  baseURL: 'https://api.github.com',
  timeout: 10000
})
// 获取Repo信息
export function getRepoInfo(owner, repo) {
  return instance({
    url: '/repos/' + owner + '/' + repo,
    method: 'GET'
  })
}
/**
 * 获取Repo分支列表
 * https://developer.github.com/v3/repos/branches/#list-branches
 */
export function getBranches(owner, repo) {
  return instance({
    url: '/repos/' + owner + '/' + repo + '/branches',
    method: 'GET'
  })
}
/**
 * 获取目录
 * https://developer.github.com/v3/git/trees/
 */
export function getTree(owner, repo, treeSha, recursive = 0) {
  return instance({
    url: '/repos/' + owner + '/' + repo + '/git/trees/' + treeSha + (recursive === 0 ? '' : '?recursive=1'),
    method: 'GET'
  })
}
/**
 * 获取文件内容
 * https://developer.github.com/v3/git/blobs/
 * GET /repos/:owner/:repo/git/blobs/:file_sha
 * @param {*} owner
 * @param {*} repo
 * @param {*} fileSha
 */
export function getBlob(owner, repo, fileSha) {
  return new Promise((resolve, reject) => {
    instance({
      url: '/repos/' + owner + '/' + repo + '/git/blobs/' + fileSha,
      method: 'GET'
    }).then(res => {
      // console.log(window.atob(res.data.content))
      resolve(decodeURIComponent(escape(window.atob(res.data.content))))
      // resolve(decodeURIComponent(window.atob(res.data.content)))
    }).catch(err => {
      reject(err)
    })
  })
}

export function getEmojis() {
  return instance({
    url: '/emojis',
    method: 'GET'
  })
}
export function postMarkdown(markdown) {
  return instance({
    url: '/markdown',
    method: 'POST',
    data: {
      text: markdown,
      mode: 'markdown',
      content: 'github/gollum'
    }
  })
}

export function search(q = '', sort = 'stars', order = 'desc') {
  return instance({
    url: '/search/repositories?q=' + q,
    method: 'GET',
    params: {
      sort,
      order
    }
  })
}
// 趋势数据
export function trend(lang, since = 'daily', type = 'Repositories') {
  return instance({
    url: `https://github-trending-api.now.sh/repositories?language=${lang}&since=${since}&spoken_language_code=`,
    method: 'GET'
  })
}
