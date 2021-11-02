import _ from 'lodash'
import { Notify, scroll } from 'quasar'
import { cns } from 'boot/cns'

const { setScrollPosition } = scroll

export function list (ctx, pars) {
  if (pars?.restart) {
    ctx.commit('setPage', 0)
  }
  if (pars?.reset) {
    ctx.commit('setSearch', '')
  }
  if (ctx.state.loading) {
    ctx.commit('setReload', true)
    return
  }
  console.log('fetch logs')
  ctx.commit('setLoading', true)
  let params = ctx.state.params
  let filter_obj = {}
  // search
  if (ctx.state.search) {
    try {
      _.assign(filter_obj, JSON.parse(ctx.state.search) || {})
    } catch (e) {
      filter_obj[cns.MessageFieldName] = { '$regex': ctx.state.search, '$options': 'i' }
    }
  }
  // level
  if (ctx.state.level !== undefined) {
    filter_obj[cns.LevelFieldName] = ctx.state.level
  }
  // tag
  if (ctx.rootState.tag.selected) {
    filter_obj[cns.SfTagFieldName] = ctx.rootState.tag.selected
  }
  // ts

  if (ctx.state.ts_gte || ctx.state.ts_lte) {
    filter_obj[cns.SfTsFieldName] = _.omitBy({
      '$gte': ctx.state.ts_gte,
      '$lte': ctx.state.ts_lte,
    }, _.isNil)
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
    } else {
      setScrollPosition(window, 0, 150)
    }
  })
}

export function changePage (ctx, v) {
  ctx.commit('setPage', v || 0)
  ctx.dispatch('list')
}

export function changePageSize (ctx, v) {
  ctx.commit('setPageSize', v || 0)
  ctx.dispatch('list')
}

export function changeLevel (ctx, v) {
  ctx.commit('setLevel', v)
  ctx.dispatch('list', { restart: true })
}

export function changeSearch (ctx, v) {
  ctx.commit('setSearch', v)
  ctx.dispatch('list', { restart: true })
}

export function changeTsGte (ctx, v) {
  ctx.commit('log/setTsGte', v)
  ctx.dispatch('list', { restart: true })
}

export function changeTsLte (ctx, v) {
  ctx.commit('log/setTsLte', v)
  ctx.dispatch('list', { restart: true })
}

export function changePeriod (ctx, { tsGte, tsLte }) {
  ctx.commit('log/setTsGte', tsGte)
  ctx.commit('log/setTsLte', tsLte)
  ctx.dispatch('list', { restart: true })
}
