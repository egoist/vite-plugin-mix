import sirv from 'sirv'
import polka from 'polka'
import { applyHandler } from './apply-handler'

const server = polka()

server.use(sirv(import.meta.env.MIX_CLIENT_DIR))
applyHandler(server)

const { PORT = 3000 } = process.env
server.listen(PORT)
console.log(`Ready at http://localhost:${PORT}`)
