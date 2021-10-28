import constants from './constants'

export function setAuthToken (state, v) {
  state.authToken = v
  this.$ls.set(constants.LsKeyAuthToken, v)
}
