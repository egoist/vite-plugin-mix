**💛 You can help the author become a full-time open-source maintainer by [sponsoring him on GitHub](https://github.com/sponsors/egoist).**

---

# vite-plugin-mix

[![npm version](https://badgen.net/npm/v/vite-plugin-mix)](https://npm.im/vite-plugin-mix)

## Install

```bash
npm i vite-plugin-mix -D
```

## Usage

`vite.config.ts`:

```ts
import { defineConfig } from 'vite'
import mix from 'vite-plugin-mix'

export default defineConfig({
  plugins: [
    mix({
      handler: './handler.ts',
    }),
  ],
})
```

`handler.ts`:

```ts
import type { Handler } from 'vite-plugin-mix'

export const handler: Handler = (req, res, next) => {
  if (req.path === '/hello') {
    return res.end('hello')
  }
  next()
}
```

The `handler` runs before serving static files, so you should make sure to call `next()` as a fallback.

To start developing, run the command `vite` as usual.

To create a production build, run the command `vite build` as usual.

Now `vite build` will create a server build to `./build` folder alongside your regular client build which is the `./dist` folder by default. To run the production build as a Node.js server, run `node build/server.js`.

## License

MIT &copy; [EGOIST](https://github.com/sponsors/egoist)
