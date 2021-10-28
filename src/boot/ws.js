import { cns } from './cns'

let _store = null
let con = null

function handleMessage (msg) {
  console.log('ws-message:', msg)
}

function onMessage (e) {
  if (e.target !== con) {
    e.target.close()
    return
  }
  handleMessage(JSON.parse(e.data || '{}'))
}

function connect () {
  if (cns.WsUrl && cns.WsUrl !== '-') {
    con = new WebSocket(cns.WsUrl + 'register?auth_token=' + _store.getters['stg/getAuthToken'])
    con.onopen = onOpen
    con.onclose = onClose
    con.onerror = onError
    con.onmessage = onMessage
  }
}

function disconnect () {
  if (con) {
    let c = con
    onClose({ target: con }, false)
    c.close()
  }
}

function onOpen (e) {
  if (e.target === con) {
    _store.commit('app/setWsOnline', true)
    console.log('ws connected')
  } else {
    e.target.close()
  }
}

function onClose (e, reconnect = true) {
  if (e.target === con) {
    con = null
    console.log('ws disconnected')
    _store.commit('app/setWsOnline', false)
    if (reconnect) {
      setTimeout(connect, 10000)
    }
  }
}

function onError (e) {
  if (e.target === con) {
    onClose(e, true)
  }
}

const ws = {
  connect,
  disconnect,
}

export default ({ Vue, store }) => {
  _store = store
  Vue.prototype.$ws = ws
}

export { ws }
