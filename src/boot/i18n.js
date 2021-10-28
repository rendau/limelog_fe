import Vue from 'vue'
import VueI18n from 'vue-i18n'

import messages from 'src/i18n'
import { cns } from 'boot/cns'

Vue.use(VueI18n)

let i18n = new VueI18n({
  locale: cns.DefaultLocale,
  fallbackLocale: cns.DefaultLocale,
  messages,
})

export default async ({ app, router }) => {
  app.i18n = i18n
  // app.i18n.locale = app.store.getters['stg/getLocale']
}

export { i18n }
