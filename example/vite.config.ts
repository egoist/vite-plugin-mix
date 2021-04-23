import { defineConfig } from 'vite'
import mix, { vercelAdapter } from '..'

export default defineConfig({
  plugins: [mix({ handler: './handler.ts', adapter: vercelAdapter() })],
})
