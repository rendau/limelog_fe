import _ from 'lodash'
import moment from 'moment'

import { cns } from './cns'

let _store

let util = {
  fmtDate (v) {
    if (!v) return ''
    return moment(v).format('LL')
  },
  fmtDateLite (v) {
    if (!v) return ''
    return moment(v).format('ll')
  },
  fmtDateSimple (v) {
    if (!v) return ''
    return moment(v).format('DD.MM.YYYY')
  },
  fmtDatetime (v) {
    if (!v) return ''
    return moment(v).format('LL | LT')
  },
  fmtDatetimeSimple (v) {
    if (!v) return ''
    return moment(v).format('DD.MM.YYYY LT')
  },
  fmtDatetimeMini (v) {
    if (!v) return ''
    return moment(v).format('DD.MM.YY | LT')
  },
  fmtTime (v) {
    if (!v) return ''
    return moment(v).format('LT')
  },
  fmtPhone (v) {
    if (!v) return ''
    return v.replace(/(\d{1})(\d{3})(\d{3})(\d{4})/, '+$1 ($2) $3-$4')
  },
  fmtNum (v, ext, vIfNil) {
    if (_.isNil(v)) return vIfNil || 0
    return v.toLocaleString() + (ext || '')
  },
  removeTags (str) {
    return str.replace(/<[^>]+>/g, '')
  },

  lFind (list, idV, idAttr = 'id') {
    if (_.isString(list)) {
      list = _store.state.dic[list]
    }
    return _.find(list || [], { [idAttr]: idV }) || null
  },
  lOps (list, vAttr = 'id', lAttr = 'name') {
    if (_.isString(list)) {
      list = _store.state.dic[list]
    }
    if (_.isFunction(lAttr)) {
      return _.map(list, x => ({
        value: x[vAttr],
        label: lAttr(x),
      }))
    }
    return _.map(list, x => ({
      value: x[vAttr],
      label: x[lAttr],
    }))
  },
  lGetAttr (list, id, attr = 'name', localed = false) {
    if (_.isString(list)) {
      list = _store.state.dic[list]
    }
    let v = (_.find(list || [], { id }) || {})[attr] || null
    return localed ? this.fmtLocaleName(v || {}) : v
  },
  lGetAttrJoined (list, ids, attr, sep = ', ') {
    return _.join(_.map(ids || [], x => this.lGetAttr(list, x, attr)), sep)
  },

  verScrollBarStyle () {
    return {
      bar: {
        width: '8px',
        'border-radius': '4px',
        'background-color': '#e5e4d8',
        opacity: 1,
      },
      thumb: {
        width: '8px',
        'border-radius': '4px',
        'background-color': '#a76301',
        opacity: 1,
      },
    }
  },

  resolveRouterPath (o) {
    if (process.env.NODE_ENV === 'production') {
      return cns.AppUrl + decodeURI(router.resolve(o).href)
    }
    return location.origin + location.pathname + decodeURI(router.resolve(o).href)
  },

  createApiUrl (path, withToken = false, qPars = {}) {
    let pars = _.assign({}, qPars)
    if (withToken) {
      pars.auth_token = _store.getters['stg/getAuthToken']
    }
    return cns.ApiUrl + path + '?' + _.join(_.map(_.toPairs(_.omitBy(pars, _.isNil)), x => `${x[0]}=${x[1]}`), '&')
  },
}

export default ({ Vue, store, router }) => {
  Vue.prototype.$u = util
  store.$u = util

  _store = store
}

export { util }
