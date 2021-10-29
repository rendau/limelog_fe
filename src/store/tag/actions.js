import { Notify } from 'quasar'

export function list (ctx) {
  if (ctx.state.loading) return
  ctx.commit('setLoading', true)
  return this.$axios.get('tag').then(({ data }) => {
    ctx.commit('setData', data)
    if (ctx.state.selected === undefined) {
      ctx.dispatch('select', null)
    }
  }, err => {
    Notify.create({ type: 'negative', message: err.data.desc })
    ctx.commit('setData', [])
  }).finally(() => ctx.commit('setLoading', false))
}

export function select (ctx, v) {
  // if (v === ctx.selected) return
  ctx.commit('setSelected', v)
  ctx.dispatch('log/list', { restart: true, reset: true }, { root: true })
}

export function remove (ctx, value) {
  return this.$axios.delete('tag', { params: { value } }).finally(() => {
    ctx.dispatch('tag/list')
  })
}
