'use strict'
import axios from 'axios'
const server = axios.create({
  // baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 2000,
  headers: {}
})
// request 拦截器
server.interceptors.request.use(function (config) {
  return config
}, function (error) {
  return Promise.reject(error)
})
// response 拦截器
server.interceptors.response.use(function (response) {
  return response
}, function (error) {
  return Promise.reject(error)
})

export default server
