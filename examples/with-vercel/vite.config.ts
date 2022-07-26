import { defineConfig } from 'vite';
import mix, { vercelAdapter } from "vite-plugin-mix";

export default defineConfig({
  plugins: [
    mix({
      handler: './handler.ts',
      adapter: vercelAdapter()
    })
  ]
});
