import path from 'path'
import { Plugin, build } from 'vite'
import polka from 'polka'
import { copyDir } from './fs'

export * from './types'

export default ({ handler }: { handler: string }): Plugin => {
  let root = process.cwd()
  let clientOutDir: string | undefined

  const getHandlerFile = () => path.resolve(root, handler)

  return {
    name: 'mix',

    config() {},

    configResolved(config) {
      root = config.root
      clientOutDir = path.resolve(root, config.build.outDir)
    },

    configureServer(devServer) {
      const handlerFile = getHandlerFile()
      devServer.middlewares.use(async (req, res, next) => {
        try {
          const mod = await devServer.ssrLoadModule(`/@fs/${handlerFile}`)
          const server = polka({
            onNoMatch: () => next(),
          })
          server.use(mod.handler)
          server.handler(req as any, res)
        } catch (error) {
          devServer.ssrFixStacktrace(error)
          console.error(error)
          process.exitCode = 1
        }
      })
    },

    async writeBundle() {
      if (process.env.MIX_SSR_BUILD) return

      process.env.MIX_SSR_BUILD = 'true'

      const runtimeDir = path.join(root, 'build/.runtime')
      const serverOutDir = path.join(root, 'build')

      await copyDir(path.join(__dirname, 'runtime'), runtimeDir)

      const handlerFile = getHandlerFile()
      await build({
        root,
        resolve: {
          alias: {
            $handler_file: handlerFile,
          },
        },
        define: {
          CLIENT_DIR: JSON.stringify(
            path.relative(process.cwd(), clientOutDir!),
          ),
        },
        build: {
          outDir: serverOutDir,
          emptyOutDir: true,
          ssr: true,
          rollupOptions: {
            input: {
              handler: handlerFile,
              server: path.join(runtimeDir, 'server.js'),
            },
          },
        },
      })
    },
  }
}
