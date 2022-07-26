# Node

This example shows how to use `vite-plugin-mix` with the Node (default) adapter.

## How it works ?

Here, we use `pnpm` as the package manager, but you can use `npm`, `yarn`, ...

- `pnpm dev` to start the Vite development server.
- `pnpm build` to build the app under the `dist` (assets) and `build` (server) folders.
- `pnpm start` to start (`node build/server.js`) the built app.

With this example, we can't use ESM packages like `got`. If you need support for ESM packages, go with the [`with-node-esm` example](../with-node-esm/).