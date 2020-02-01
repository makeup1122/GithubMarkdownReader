const mixin = {
  methods: {
    getOwner: url => {
      const w = url.split('/')
      return w[3]
    },
    getRepo: url => {
      const w = url.split('/')
      return w[4]
    }
  }
}
export default mixin
