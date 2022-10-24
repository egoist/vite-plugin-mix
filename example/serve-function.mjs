import polka from 'polka'
import handler from './.vercel/output/functions/handler.func/handler.mjs'

async function main() {
  const app = polka()

  app.use(handler)

  app.listen(3000)
  console.log('http://localhost:3000')
}

main()
