const polka = require('polka')

const app = polka()
const handler = require('./.vercel_build_output/functions/node/render').default

app.use(handler)

app.listen(3000)
console.log('http://localhost:3000')
