import Spn from './Spn.vue'
import Spinner from './Spinner.vue'
import TableFooter from './TableFooter.vue'
import TablePagination from './TablePagination.vue'
import TableTotalCounter from './TableTotalCounter.vue'
import ListNoRowsLabel from './ListNoRowsLabel.vue'
import InputPeriod from './InputPeriod'
import InputDate from './InputDate'

export function register (Vue) {
  Vue.component('ac-spn', Spn)
  Vue.component('ac-spinner', Spinner)
  Vue.component('ac-input-date', InputDate)
  Vue.component('ac-table-footer', TableFooter)
  Vue.component('ac-table-pagination', TablePagination)
  Vue.component('ac-table-total-counter', TableTotalCounter)
  Vue.component('ac-list-no-rows-label', ListNoRowsLabel)
  Vue.component('ac-input-period', InputPeriod)
}
