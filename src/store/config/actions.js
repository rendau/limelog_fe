export function get (ctx) {
  return this.$axios.get(`config`).then(resp => {
    ctx.commit('set', resp.data)
  })
}

export function set (ctx, data) {
  return this.$axios.put(`config`, data).then(resp => {
    return ctx.dispatch('get').then(() => resp)
  })
}
