'use strict'

const httpServer     = require('./lib/httpServer')
const webhookHandler = require('./lib/webhookHandler')

const config         = require('./config.js')

// 创建handler 可创建多个, 新handler并需再创建一个对应的http服务
let handler = webhookHandler.create(config)

// 将hooker监听到http的6666端口
httpServer.create((req, res) => { webhookHandler.server(handler, req, res) }, 6666)

// handler 加载支持处理的事件
webhookHandler.loadPushEvent(handler)
webhookHandler.loadErrorEvent(handler)

