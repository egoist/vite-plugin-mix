import { defineConfig } from 'vite';
import * as mix from "vite-plugin-mix";

export default defineConfig({
  plugins: [
    mix.default({
      handler: './handler.ts',
      adapter: mix.vercelAdapter()
    })
  ]
});
