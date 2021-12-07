function InitLimelog (opt) {
  /*
    {
      url: 'http://limelog/api',
      tag: 'my-app-name',
    }
   */

  let ctx = {
    opt: opt || {},
    getXHR () {
      if (typeof XMLHttpRequest !== 'undefined') {
        return new XMLHttpRequest()
      }
      try {
        return new ActiveXObject('Msxml2.XMLHTTP')
      } catch (e) {
        try {
          return new ActiveXObject('Microsoft.XMLHTTP')
        } catch (ee) {
        }
      }
      return null
    },
    fetch (url, opts) {
      let xhr = this.getXHR()
      return (new Promise(function (resolve, reject) {
        xhr.open(opts.method || 'GET', url, true)
        xhr.onreadystatechange = (() => {
          if (xhr.readyState !== 4) return
          if (xhr.status >= 200 && xhr.status < 300) { // success
            resolve({ status: xhr.status, text: xhr.responseText })
          } else {
            reject({ status: xhr.status, text: xhr.responseText })
          }
        })
        if (opts.headers) {
          for (let k in opts.headers) {
            xhr.setRequestHeader(k, opts.headers[k])
          }
        }
        xhr.send(opts.body || undefined)
      }))
    },
    sendLog (level, body) {
      body.sf_tag = opt.tag || null
      body.level = level
      this.fetch(opt.url, {
        method: 'POST',
        body: JSON.stringify([body]),
      })
    },
  }

  let originConsole = {
    log: console.log,
    info: console.info,
    warn: console.warn,
    error: console.error,
  }

  console.error = function () {
    let args = Array.prototype.slice.call(arguments)
    let data = {
      message: args.join(' '),
    }
    args.forEach((x, i) => {
      if (x.stack) {
        data['stacktrace' + (i || '')] = x.stack
      }
    })
    ctx.sendLog('error', data)
    originConsole.error.apply(console, arguments)
  }

  console.warn = function () {
    let args = Array.prototype.slice.call(arguments)
    ctx.sendLog('warn', {
      message: args.join(' '),
    })
    originConsole.warn.apply(console, arguments)
  }

  window.onerror = function (msg, url, lineNo, columnNo, error) {
    let data = {
      message: '' + msg,
    }

    if (error.stack) {
      data['stacktrace'] = error.stack
    }

    ctx.sendLog('error', data)

    return false
  }
}
