import { cns } from 'boot/cns'
import { ws } from 'boot/ws'

let ctxLoadSinceAppStartPr = null

export function refresh ({ state, dispatch }, nr401) {
  console.log('start refresh-profile')
  let params = {}
  if (nr401) {
    params['___nr401___'] = 'true'
  }
  return this.$axios.get('profile', { params }).then(resp => {
    // console.log('profile', resp.data)

    return dispatch('set', resp.data).then(() => resp)
  })
}

export function refreshSinceAppStart ({ dispatch }) {
  if (!ctxLoadSinceAppStartPr) {
    console.log('start refresh-profile since app-start')
    ctxLoadSinceAppStartPr = dispatch('refresh', true).catch(err => {
      if (err.data && err.data.code === cns.ErrNotAuthorized) {
        return Promise.resolve(null)
      } else {
        console.error(err)
        return Promise.reject(err)
      }
    })
  }

  return ctxLoadSinceAppStartPr
}

export function resetCtxLoadSinceAppStartPr () {
  ctxLoadSinceAppStartPr = null
}

export function auth ({ commit, dispatch }, data) {
  return this.$a_axios.post('profile/auth', data).then(resp => {
    commit('stg/setAuthToken', resp.data.token, { root: true })
    return dispatch('refresh')
  })
}

export function logout ({ dispatch }) {
  return dispatch('set', null)
}

export function set ({ state, commit, dispatch }, value) {
  let vChanged = !!state.ctx !== !!value

  if (!value) {
    commit('stg/setAuthToken', '', { root: true })
    ws.disconnect()
  }

  commit('setCtx', value)

  if (vChanged) {
    if (value) {
      ws.connect()
    }
  }

  return state.ctx
}
