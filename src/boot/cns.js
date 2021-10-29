const cns = {
  AppName: 'LimeLog',
  ApiUrl: 'https://api.zeon.mechta.market/ll',
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

  DefaultPageSize: 20,
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
