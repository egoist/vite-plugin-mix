import http from 'http'
import handler from 'mix-output-handler'

const server = http.createServer((req, res) => {
  handler(req, res)
})

const { PORT = 3000 } = process.env
server.listen(PORT)
console.log(`http://localhost:${PORT}`)
