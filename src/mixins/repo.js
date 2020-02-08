
const mixin = {
  methods: {
    $_getOwner: url => {
      const w = url.split('/')
      return w[3]
    },
    $_getRepo: url => {
      const w = url.split('/')
      return w[4]
    }
  }
}
export default mixin
