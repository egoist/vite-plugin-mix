# Node (ESM)

This example shows how to use `vite-plugin-mix` with the Node (default) adapter and `"type": "module"` in your `package.json` file.

## How it works ?

Here, we use `pnpm` as the package manager, but you can use `npm`, `yarn`, ...

- `pnpm dev` to start the Vite development server.
- `pnpm build` to build the app under the `dist` (assets) and `build` (server) folders.
- `pnpm start` to start (`node build/server.js`) the built app.
