import fs from 'fs'
import path from 'path'
import http from 'http'
import { handler } from '$handler_file'
import sirv from 'sirv'
import polka from 'polka'
import { serverIndex } from './serve-index'

const server = polka()

server.use(sirv(import.meta.env.MIX_CLIENT_DIR))

server.use(handler)
server.use(serverIndex)

const { PORT = 3000 } = process.env
server.listen(PORT)
console.log(`Ready at http://localhost:${PORT}`)
