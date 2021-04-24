import path from 'path'
import { nodeFileTrace } from '@vercel/nft'
import { Adapter } from '..'
import { copy, copyDir, moveFile, outputFile } from '../fs'

export const vercelAdapter = (): Adapter => {
  return {
    name: 'vercel',

    rollupInput: {
      render: path.join(__dirname, 'runtime/vercel-render.js'),
    },

    async buildEnd({ root, serverOutDir, clientOutDir }) {
      const dir = path.join(root, '.vercel_build_output')
      await outputFile(
        path.join(dir, 'config/routes.json'),
        JSON.stringify([
          { handle: 'filesystem' },
          {
            src: '/(.*)',
            dest: '/.vercel/functions/render',
          },
        ]),
      )

      // build vercel function
      const functionDir = path.join(dir, 'functions/node/render')
      copyDir(serverOutDir, functionDir)
      moveFile(
        path.join(functionDir, 'render.js'),
        path.join(functionDir, 'index.js'),
      )

      const traceResult = await nodeFileTrace([
        path.join(functionDir, 'render.js'),
      ])

      await Promise.all(
        traceResult.fileList.map(async (file) => {
          if (!file.includes('node_modules')) return
          const outFile = path.join(functionDir, file)
          await copy(file, outFile)
        }),
      )

      // copy static folder
      await copyDir(clientOutDir, path.join(dir, 'static'))
    },
  }
}
