import _ from 'lodash'
import { cns } from 'boot/cns'

export default function () {
  return {
    loading: false,
    data: {
      total_count: 0,
      results: [],
    },
    params: {
      page: 0,
      page_size: cns.DefaultPageSize,
    },
    level: undefined,
    search: '',
    period_type: _.head(cns.PeriodTypes),
    ts_gte: null,
    ts_lte: null,
    reload: false,
  }
}
