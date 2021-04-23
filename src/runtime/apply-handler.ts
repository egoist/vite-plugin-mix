import { handler } from '$handler_file'
import { serveIndex } from './serve-index'

export const applyHandler = (server: any) => {
  if (Array.isArray(handler)) {
    handler.forEach((h) => server.use(h))
  } else {
    server.use(handler)
  }
  server.use(serveIndex)
}
