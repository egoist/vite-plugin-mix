import sirv from 'sirv'
import polka from 'polka'
import { applyHandler } from './apply-handler'

// Here, we use `VoidFunction` to prevent type errors.
const assets = sirv(import.meta.env.MIX_CLIENT_DIR) as VoidFunction

const server = polka()
server.use(assets)
applyHandler(server)

const { PORT = 3000 } = process.env
server.listen(PORT)
console.log(`Ready at http://localhost:${PORT}`)
