import path from 'path'
import { build } from 'esbuild'
import { Adapter } from '..'
import { copyDir, outputFile } from '../fs'

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
      const functionOutPath = path.join(dir, 'functions/node/render/index.js')
      await build({
        entryPoints: [path.join(serverOutDir, 'render.js')],
        format: 'cjs',
        platform: 'node',
        target: `node${process.version.slice(1)}`,
        outfile: functionOutPath,
        bundle: true,
      })

      // copy static folder
      await copyDir(clientOutDir, path.join(dir, 'static'))
    },
  }
}
