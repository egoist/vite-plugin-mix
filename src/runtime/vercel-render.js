import http from 'http'
import { handler } from '$handler_file'
import polka from 'polka'
import { serverIndex } from './serve-index'

const server = polka()

server.use(handler)
server.use(serverIndex)

export default server.handler
