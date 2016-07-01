var http = require('http')
var tape = require('tape')
var listen = require('./index')

function serverFn (req, res) {
  res.writeHead(200)
  res.end('hi')
}

tape('Gives a random port', function (t) {
  var server = http.createServer(serverFn)
  listen(server, function (err, port) {
    console.log('Listening', err, port)
    t.ok(!err)
    t.ok(!!port)
    server.close()
    t.end()
  })
})

tape('Gives a random port in the given range', function (t) {
  var server = http.createServer(serverFn)
  listen(server, { from: 5000, to: 5005 }, function (err, port) {
    console.log('Listening', err, port)
    t.ok(!err)
    t.ok(port >= 5000 && port < 5005)
    server.close()
    t.end()
  })
})

tape('Handles already-taken ports', function (t) {
  var server1 = http.createServer(serverFn)
  var server2 = http.createServer(serverFn)
  var server3 = http.createServer(serverFn)
  var server4 = http.createServer(serverFn)
  server1.listen(5000)
  server2.listen(5001)
  server3.listen(5002)
  server4.listen(5003)

  var server = http.createServer(serverFn)
  listen(server, { from: 5000, to: 5005 }, function (err, port) {
    console.log('Listening', err, port)
    t.ok(!err)
    t.ok(port >= 5000 && port < 5005)
    server1.close()
    server2.close()
    server3.close()
    server4.close()
    server.close()
    t.end()
  })
})