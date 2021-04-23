import { defineConfig } from 'vite'
import mix from '..'

export default defineConfig({
  plugins: [mix({ handler: './handler.ts' })],
})
