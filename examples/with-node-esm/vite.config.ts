import { defineConfig } from 'vite';
import mix, { nodeAdapter } from "vite-plugin-mix";

export default defineConfig({
  plugins: [
    mix({
      handler: './handler.ts',
      adapter: nodeAdapter() // This is the default adapter so you don't really need to import and specify it.
    })
  ]
});
