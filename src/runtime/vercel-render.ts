import polka from 'polka'
import { applyHandler } from './apply-handler'

const server = polka()

applyHandler(server)

export default server.handler
