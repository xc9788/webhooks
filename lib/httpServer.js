'use strict'

const http = require('http')

module.exports = {
  create: (func, port) => {
    return http.createServer(func).listen(port)
  }
}
