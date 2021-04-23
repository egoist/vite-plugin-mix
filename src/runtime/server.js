import http from 'http'
import { handler } from '$handler_file'
import sirv from 'sirv'
import polka from 'polka'

const server = polka()

server.use(sirv(CLIENT_DIR))

server.use(handler)

const { PORT = 3000 } = process.env
server.listen(PORT)
console.log(`Ready at http://localhost:${PORT}`)
