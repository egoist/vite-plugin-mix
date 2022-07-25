import type { Handler } from 'vite-plugin-mix'
import { transform } from 'esbuild'

export const handler: Handler = async (req, res, next) => {
  // GET /api
  if (req.path === '/api') {
    const result = await transform(`export const foo = 1`, { format: 'cjs' })
    res.end(result.code)
    return
  }

  next();
}
