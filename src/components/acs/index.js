import Spn from './Spn.vue'
import Spinner from './Spinner.vue'
import TableTools from './TableTools.vue'
import TablePagination from './TablePagination.vue'
import TableTotalCounter from './TableTotalCounter.vue'
import TrNoRows from './TrNoRows'
import InputPeriod from './InputPeriod'
import InputDate from './InputDate'
import LevelBadge from './LevelBadge'

export function register (Vue) {
  Vue.component('ac-spn', Spn)
  Vue.component('ac-spinner', Spinner)
  Vue.component('ac-table-tools', TableTools)
  Vue.component('ac-table-pagination', TablePagination)
  Vue.component('ac-table-total-counter', TableTotalCounter)
  Vue.component('ac-tr-no-rows', TrNoRows)
  Vue.component('ac-input-date', InputDate)
  Vue.component('ac-input-period', InputPeriod)
  Vue.component('ac-level-badge', LevelBadge)
}
