import type { Handler } from 'vite-plugin-mix'
import { nanoid } from 'nanoid'

export const handler: Handler = async (req, res, next) => {
  if (req.path === '/id') {
    res.end(nanoid())
    return
  }
  next()
}
