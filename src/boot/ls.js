const ls = {
  set (k, v) {
    try {
      if (localStorage && localStorage.setItem) {
        localStorage.setItem(k, v)
      }
    } catch (e) {
      console.error('fail to ls-set', e)
    }
  },
  get (k) {
    try {
      if (localStorage && localStorage.getItem) {
        return localStorage.getItem(k)
      } else {
        return null
      }
    } catch (e) {
      console.error('fail to ls-get', e)
      return null
    }
  },
}

export default ({ store }) => {
  store.$ls = ls
}
