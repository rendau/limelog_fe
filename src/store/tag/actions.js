import { Notify } from 'quasar'

export function list (ctx) {
  if (ctx.state.loading) return
  ctx.commit('setLoading', true)
  return this.$axios.get('tag').then(({ data }) => {
    ctx.commit('setData', data || [])
  }, err => {
    Notify.create({ type: 'negative', message: err.data.desc })
    ctx.commit('setData', [])
    return Promise.reject(err)
  }).finally(() => ctx.commit('setLoading', false))
}

export function remove (ctx, value) {
  return this.$axios.delete('tag', { params: { value } }).finally(() => {
    ctx.dispatch('tag/list')
  })
}
