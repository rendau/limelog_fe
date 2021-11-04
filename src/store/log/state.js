import _ from 'lodash'
import { cns } from 'boot/cns'

export default function () {
  let periodType = _.find(cns.PeriodTypes, 'default') || _.head(cns.PeriodTypes) || null

  return {
    loading: false,
    data: {
      total_count: 0,
      results: [],
    },
    selectedMsg: null,
    params: {
      page: 0,
      page_size: cns.DefaultPageSize,
    },
    level: undefined,
    search: '',
    period_type: _.find(cns.PeriodTypes, 'default') || _.head(cns.PeriodTypes),
    ts_gte: periodType?.ts_gte || null,
    ts_lte: periodType?.ts_lte || null,
    reload: false,
    ar_dur: 10000, // auto-refresh duration milliseconds
  }
}
