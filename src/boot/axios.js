import _ from 'lodash'
import axios from 'axios'
import { cns } from './cns'
import { i18n } from './i18n'

const RTO = 30000

let _router = null
let _store = null

function transformErr (data) { // returns custom (for app) error
  if (data && data.error_code) {
    let res = _.assign(
      _.omit(data, ['error_code', 'error_desc']),
      { code: data.error_code },
      { desc: i18n.t(`api_err.${data.error_code}`) || i18n.t('system_err_msg') },
    )

    if (res.fields && _.isObject(res.fields)) {
      res.fields = _.mapValues(res.fields, eCode => i18n.t(`api_err.${eCode}`))
    }

    return res
  }

  return null
}

function baseFulfillHandler (resp) {
  return resp
}

function baseRejectHandler (err) {
  if (!err) {
    err = {}
  }

  // console.error('baseRejectHandler', err.response)

  return Promise.reject({
    config: err.config,
    request: err.request,
    response: err.response,
    data: transformErr((err.response || {}).data) || {
      code: cns.ErrSystem,
      desc: i18n.t('system_err_msg'),
    },
  })
}

// AXIOS
function createAxios () {
  let ins = axios.create({
    baseURL: cns.ApiUrl,
    responseType: 'json',
    timeout: RTO,
  })

  ins.interceptors.request.use(config => {
    let token = _store.getters['stg/getAuthToken']
    if (token) {
      config.headers['Authorization'] = token
    }

    return config
  })

  ins.interceptors.response.use(
    baseFulfillHandler,
    baseRejectHandler,
  )

  ins.interceptors.response.use(resp => resp, err => {
      if (err.data.code === cns.ErrNotAuthorized) {
        let respConfig = err.config

        return _store.dispatch('profile/logout').then(() => {
          if ((respConfig.params || {})['___nr401___'] !== 'true') {
            console.log('not authed redirect')

            _router.push('/')
          }
        }, () => {}).then(() => Promise.reject(err))
      }

      return Promise.reject(err)
    },
  )

  return ins
}

// ANONYMOUS AXIOS
function createAnonymousAxios () {
  let ins = axios.create({
    baseURL: cns.ApiUrl,
    responseType: 'json',
    timeout: RTO,
  })

  ins.interceptors.response.use(
    baseFulfillHandler,
    baseRejectHandler,
  )

  return ins
}

// RAW AXIOS
function createRawAxios () {
  return axios.create({})
}

export default ({ Vue, store, router }) => {
  let axiosIns = createAxios()
  let aAxiosIns = createAnonymousAxios()
  let rAxiosIns = createRawAxios()

  Vue.prototype.$axios = axiosIns
  Vue.prototype.$a_axios = aAxiosIns
  Vue.prototype.$r_axios = rAxiosIns
  store.$axios = axiosIns
  store.$a_axios = aAxiosIns
  store.$r_axios = rAxiosIns

  _router = router
  _store = store
}
