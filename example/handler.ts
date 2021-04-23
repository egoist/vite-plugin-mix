import type { Handler } from '../'

export const handler: Handler = (req, res, next) => {
  if (req.path === '/foo') {
    res.end('foo')
    return
  }
  next()
}
