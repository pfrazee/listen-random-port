module.exports = function (server, opts, cb) {
  if (typeof opts == 'function') {
    cb = opts
    opts = null
  }
  opts = opts || {}
  var from = opts.from || 1025
  var to   = opts.to   || 65e3
  var port

  server.on('listening', function () {
    cb(null, port)
  })
  server.on('error', function (err) {
    if (err.code == 'EADDRINUSE')
      tryAgain()
  })

  tryAgain()
  function tryAgain () {
    port = (from + ~~(Math.random() * (to-from)))
    server.listen(port, opts.host)
  }
}