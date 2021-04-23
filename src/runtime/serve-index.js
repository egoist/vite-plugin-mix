export const serverIndex = (req, res) => {
  res.setHeader('Content-Type', 'text/html')
  res.end(import.meta.env.MIX_HTML)
}
