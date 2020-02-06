const dbName = 'gmr'
const version = 1
var db = null
// var objectStore = null
const objectStoreName = 'history'
const key = 'url'

export default {
  open() {
    var request = window.indexedDB.open(dbName, version)
    request.onerror = function (event) {
      console.log(event)
      console.log('数据库打开报错')
    }
    request.onsuccess = function (event) {
      db = request.result
      console.log('数据库打开成功')
    }
    request.onupgradeneeded = function (event) {
      db = event.target.result
      if (!db.objectStoreNames.contains(objectStoreName)) {
        db.createObjectStore(objectStoreName, { keyPath: key })
      }
    }
  },
  add() {
    let objectStore = db.transaction([objectStoreName], 'readwrite').objectStore(objectStoreName)
    objectStore.add({ url: 'httpddddd', name: 'test' })
    objectStore.onsuccess = function (event) {
      console.log('数据写入成功')
    }
    objectStore.onerror = function (event) {
      console.log('数据写入失败')
    }
  }
}
