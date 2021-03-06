import _ from 'lodash'
import { Notify, scroll } from 'quasar'
import { cns } from 'boot/cns'

const { setScrollPosition } = scroll

let arTimeoutId = null

export function list (ctx, pars = {}) {
  clearTimeout(arTimeoutId)
  if (ctx.state.ts_lte) {
    ctx.commit('setArDur', null)
  }
  if (!ctx.rootState.profile.ctx) {
    return
  }
  if (pars.restart) {
    ctx.commit('setPage', 0)
  }
  if (pars.reset) {
    ctx.commit('setSearch', '')
  }
  if (ctx.state.loading) {
    ctx.commit('setReload', true)
    return
  }
  console.log('fetch logs')
  ctx.commit('setLoading', true)
  let filter_obj = {}
  // search
  if (ctx.state.search) {
    let conds = _.map(_.reject(_.split(ctx.state.search, ' && '), x => !x), x => {
      return { [cns.SfMessageFieldName]: { '$regex': _.replace(x, /"/g, '\\\\\"'), '$options': 'i' } }
    })
    if (conds.length > 0) {
      filter_obj['$and'] = conds
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
  let data = _.assign({}, ctx.state.params, { filter_obj })
  return this.$axios.post('log/list', data).then(({ data }) => {
    ctx.commit('setData', data)
  }, err => {
    Notify.create({ type: 'negative', message: err.data.desc })
    ctx.commit('setData', null)
  }).finally(() => {
    clearTimeout(arTimeoutId)
    ctx.commit('setLoading', false)
    if (ctx.state.reload) {
      ctx.commit('setReload', false)
      ctx.dispatch('list')
    } else {
      if (ctx.state.ar_dur && ctx.rootState.profile.ctx) {
        arTimeoutId = setTimeout(() => ctx.dispatch('list', { no_scroll: true }), ctx.state.ar_dur)
      }
      if (!pars.no_scroll) {
        setScrollPosition(window, 0, 150)
      }
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
  ctx.commit('setTsGte', v)
  ctx.commit('setPeriodType', null)
  ctx.dispatch('list', { restart: true })
}

export function changeTsLte (ctx, v) {
  ctx.commit('setTsLte', v)
  ctx.commit('setPeriodType', null)
  ctx.dispatch('list', { restart: true })
}

export function changePeriod (ctx, { ts_gte, ts_lte }) {
  ctx.commit('setTsGte', ts_gte)
  ctx.commit('setTsLte', ts_lte)
  ctx.dispatch('list', { restart: true })
}

export function changePeriodType (ctx, v) {
  ctx.commit('setPeriodType', v)
  if (v) {
    ctx.commit('setArDur', cns.DefaultArDur)
  }
  ctx.dispatch('changePeriod', v)
}

export function changeArDur (ctx, v) {
  ctx.commit('setArDur', v)
  clearTimeout(arTimeoutId)
  if (v) {
    arTimeoutId = setTimeout(() => ctx.dispatch('list', { no_scroll: true }), v)
  }
}
