import moment from 'moment'
import 'moment/locale/ru'

export default ({ Vue, app }) => {
  // let locale = app.store.getters['stg/getLocaleStd']
  // if (locale) {
  //   moment.locale(locale)
  // }
  Vue.prototype.$m = moment
}
