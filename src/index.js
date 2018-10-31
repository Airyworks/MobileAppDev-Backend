const childProcess = require('child_process')
const { log, warn, error } = console

const httpServ = childProcess.fork('./src/http/')
log(`[info] HTTP server starts`)
const wsServ = childProcess.fork('./src/ws/')
log(`[info] Websocket server starts`)

httpServ.on('error', err => error)
httpServ.on('exit', () => warn('[warn] HTTP server stops'))
wsServ.on('error', err => error)
wsServ.on('exit', () => warn('[warn] Websocket server stops'))
