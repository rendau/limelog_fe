export function get (ctx) {
  return this.$axios.get(`config`).then(({ data }) => {
  })
}

export function set (ctx, data) {
  return this.$axios.put(`config`, data).then(resp => {
    return ctx.dispatch('config/get').then(() => resp)
  })
}
