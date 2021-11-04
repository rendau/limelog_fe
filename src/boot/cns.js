import moment from 'moment'

const cns = {
  AppName: 'LimeLog',
  ApiUrl: 'https://api.zeon.mechta.market/limelog',
  WsUrl: '-',

  LocaleRu: 'ru-ru',
  LocaleEn: 'en-us',
  LocaleKk: 'kk-kk',

  DefaultLocale: 'ru-ru',

  ErrSystem: 'system_error',
  ErrNotAuthorized: 'not_authorized',
  ErrWrongSmsCode: 'wrong_sms_code',
  ErrSmsSendLimitReached: 'sms_send_limit_reached',
  ErrSmsSendTooFrequent: 'sms_send_too_frequent',

  indexRouteName: 'index',
  authRouteName: 'auth',

  SystemFieldPrefix: 'sf_',
  SfTsFieldName: 'sf_ts',
  SfTagFieldName: 'sf_tag',
  SfMessageFieldName: 'sf_message',
  MessageFieldName: 'message',
  LevelFieldName: 'level',

  DefaultPageSize: 20,

  PeriodTypes: [
    { ts_gte: null, ts_lte: null, label: 'All periods' },
    { ts_gte: moment().add(-30, 'minute').valueOf(), ts_lte: null, label: '30 min' },
    { ts_gte: moment().add(-2, 'hour').valueOf(), ts_lte: null, label: '2 hour' },
    { ts_gte: moment().add(-1, 'day').valueOf(), ts_lte: null, label: '1 day' },
    { ts_gte: moment().add(-3, 'day').valueOf(), ts_lte: null, label: '3 days' },
    { ts_gte: moment().add(-7, 'day').valueOf(), ts_lte: null, label: '7 days', default: true },
    { ts_gte: moment().add(-15, 'day').valueOf(), ts_lte: null, label: '15 days' },
    { ts_gte: moment().add(-1, 'month').valueOf(), ts_lte: null, label: '1 month' },
    { ts_gte: moment().add(-3, 'month').valueOf(), ts_lte: null, label: '3 month' },
  ],

  RefreshRates: [
    { value: null, label: 'Not refresh' },
    { value: 2000, label: '2 seconds' },
    { value: 5000, label: '5 seconds' },
    { value: 10000, label: '10 seconds' },
    { value: 30000, label: '30 seconds' },
    { value: 60000, label: '1 minute' },
  ],
}

if (process.env.API_URL) {
  cns.ApiUrl = process.env.API_URL
}

if (process.env.WS_URL) {
  cns.WsUrl = process.env.WS_URL
}

console.log('ApiUrl:', cns.ApiUrl)

export default ({ Vue }) => {
  Vue.prototype.$cns = cns
}

export { cns }
