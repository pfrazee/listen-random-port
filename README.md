# listen-random-port

```js
var listen = require('listen-random-port')

var server = http.createServer(serverFn)
listen(server, function (err, port) {
  console.log('Listening', err, port)
  // ...
})

// full opts:
listen(server, { from: 5000, to: 6000, host: '127.0.0.1' }, function (err, port) {
  console.log('Listening', err, port)
  // ...
})
```