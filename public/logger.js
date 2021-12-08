(function () {
  var ctx = window.LimeLog || {}

  ctx.getXHR = function () {
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
  }

  ctx.fetch = function (url, opts) {
    var xhr = ctx.getXHR()
    return (new Promise(function (resolve, reject) {
      xhr.open(opts.method || 'GET', url, true)
      xhr.onreadystatechange = function () {
        if (xhr.readyState !== 4) return
        if (xhr.status >= 200 && xhr.status < 300) { // success
          resolve({ status: xhr.status, text: xhr.responseText })
        } else {
          reject({ status: xhr.status, text: xhr.responseText })
        }
      }
      if (opts.headers) {
        for (var k in opts.headers) {
          xhr.setRequestHeader(k, opts.headers[k])
        }
      }
      xhr.send(opts.body || undefined)
    }))
  }

  ctx.buffer = ctx.buffer || []

  var originHandler = ctx.handler

  ctx.handler = function () {
    if (originHandler) {
      originHandler.apply(ctx, arguments)
    }
    ctx.trigger()
  }

  ctx.sending = false
  ctx.need_resend = false

  ctx.trigger = function () {
    if (ctx.sending) {
      ctx.need_resend = true
      return
    }
    ctx.sending = true
    var data = []
    ctx.buffer.forEach(function (item) {
      var argsArr = Array.prototype.slice.call(item.args)
      var d = {
        sf_tag: ctx.tag || null,
        level: item.level,
        message: argsArr.join(' '),
      }
      argsArr.forEach(function (x, i) {
        if (x.stack) {
          d['stacktrace' + (i || '')] = x.stack
        }
      })
      data.push(d)
    })
    ctx.buffer = []
    ctx.fetch(ctx.url, {
      method: 'POST',
      body: JSON.stringify(data),
    }).catch(function () {}).then(function () {
      ctx.sending = false
      if (ctx.need_resend) {
        ctx.need_resend = false
        ctx.trigger()
      }
    })
  }
})()
