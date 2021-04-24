import polka from 'polka'
import { applyHandler } from './apply-handler'

const server = polka()

applyHandler(server)

export default (req: any, res: any) => server.handler(req, res)
