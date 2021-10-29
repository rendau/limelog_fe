import Vue from 'vue'
import Vuex from 'vuex'

import stg from './stg'
import config from './config'
import app from './app'
import profile from './profile'
import tag from './tag'
import log from './log'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      stg,
      config,
      app,
      profile,
      tag,
      log,
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEBUGGING,
  })

  return Store
}
