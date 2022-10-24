import path from 'path'
import { nodeFileTrace } from '@vercel/nft'
import { Adapter } from '..'
import { copy, copyDir, outputFile, existSync, removeSync } from '../fs'

export const vercelAdapter = (): Adapter => {
  return {
    name: 'vercel',

    rollupInput: {
      handler: path.join(__dirname, 'runtime/vercel-handler.js'),
    },

    async buildEnd({ root, serverOutDir, clientOutDir }) {
      const vercelDir = path.join(root, '.vercel/output')
      removeSync(vercelDir, { recursive: true, force: true })

      await outputFile(
        path.join(vercelDir, 'config.json'),
        JSON.stringify({
          version: 3,
          routes: [
            { handle: 'filesystem' },
            {
              src: '/(.*)',
              dest: '/handler',
            },
          ],
        }),
      )

      // build vercel function
      const functionDir = path.join(vercelDir, 'functions/handler.func')
      await copyDir(serverOutDir, functionDir)

      const handlerFilePath = existSync(path.join(functionDir, 'handler.js'))
        ? path.join(functionDir, 'handler.js')
        : path.join(functionDir, 'handler.mjs')
      await outputFile(
        path.join(functionDir, '.vc-config.json'),
        JSON.stringify({
          runtime: 'nodejs16.x',
          handler: path.basename(handlerFilePath),
          // maxDuration: 3,
          launcherType: 'Nodejs',
          // shouldAddHelpers: true,
          // shouldAddSourcemapSupport: true,
        }),
      )

      const traceResult = await nodeFileTrace([handlerFilePath])

      await Promise.all(
        traceResult.fileList.map(async (file) => {
          console.log(file)
          if (!file.includes('node_modules')) return
          const outFile = path.join(functionDir, file)
          await copy(file, outFile)
        }),
      )

      // copy static folder
      await copyDir(clientOutDir, path.join(vercelDir, 'static'))
    },
  }
}
