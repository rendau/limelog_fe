import _ from 'lodash'
import { Notify } from 'quasar'
import { cns } from 'boot/cns'

export function list (ctx, pars) {
  if (pars?.restart) {
    ctx.commit('setPage', 0)
  }
  if (pars?.reset) {
    ctx.commit('setFilter', {})
  }
  if (ctx.state.loading) {
    ctx.commit('setReload', true)
    return
  }
  ctx.commit('setLoading', true)
  let params = ctx.state.params
  let filter_obj = _.assign({}, ctx.state.filter)
  if (ctx.rootState.tag.selected) {
    filter_obj[cns.SfTagFieldName] = ctx.rootState.tag.selected
  }
  return this.$axios.post('log/list', { filter_obj }, { params }).then(({ data }) => {
    ctx.commit('setData', data)
  }, err => {
    Notify.create({ type: 'negative', message: err.data.desc })
    ctx.commit('setData', null)
  }).finally(() => {
    ctx.commit('setLoading', false)
    if (ctx.state.reload) {
      ctx.commit('setReload', false)
      ctx.dispatch('list')
    }
  })
}
