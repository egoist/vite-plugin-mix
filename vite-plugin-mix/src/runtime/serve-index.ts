import { Handler } from '..'

export const serveIndex: Handler = (req, res) => {
  res.setHeader('Content-Type', 'text/html')
  res.end(import.meta.env.MIX_HTML)
}
