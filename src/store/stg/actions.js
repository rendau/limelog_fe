import constants from './constants'

export async function loadFromFs ({ commit }) {
  commit('setAuthToken', this.$ls.get(constants.LsKeyAuthToken))
}
