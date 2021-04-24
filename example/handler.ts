import type { Handler } from '../'
import { transform } from 'esbuild'

export const handler: Handler = async (req, res, next) => {
  if (req.path === '/foo') {
    const result = await transform(`export const foo = 1`, { format: 'cjs' })
    res.end(result.code)
    return
  }
  next()
}
