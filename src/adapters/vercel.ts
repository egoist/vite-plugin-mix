import path from 'path'
import { nodeFileTrace } from '@vercel/nft'
import { Adapter } from '..'
import { copy, copyDir, moveFile, outputFile, mkdirp } from '../fs'

/**
 * Here, the `version` property and the `config.json` are required to make it work.
 * More informations on [the Vercel docs](https://vercel.com/docs/build-output-api/v3#build-output-configuration).
 */
const CONFIG_OUTPUT_VERCEL = JSON.stringify({
  version: 3
});

/**
 * This is the configuration for the `render` serverless function.
 * More informations on [the Vercel docs](https://vercel.com/docs/build-output-api/v3#vercel-primitives/serverless-functions/configuration/node-js-config).
 */
const CONFIG_SERVERLESS_FUNCTION = JSON.stringify({
  runtime: "nodejs16.x",
  handler: "index.js",
  launcherType: "Nodejs"
});

export const vercelAdapter = (): Adapter => {
  return {
    name: 'vercel',

    rollupInput: {
      render: path.join(__dirname, 'runtime/vercel-render.js'),
    },

    async buildEnd({ root, serverOutDir, clientOutDir }) {
      // Create the Vercel Build Output directory.
      const vercelDir = path.join(root, '.vercel', "output")
      mkdirp(vercelDir);

      // Create the Build Output configuration.
      await outputFile(
        path.join(vercelDir, 'config.json'),
        CONFIG_OUTPUT_VERCEL
      )

      // Build Vercel serverless function called `render`.
      const functionDir = path.join(vercelDir, 'functions/render.func')
      await copyDir(serverOutDir, functionDir)
      await moveFile( // Rename `render.js` to `index.js`
        path.join(functionDir, 'render.js'),
        path.join(functionDir, 'index.js')
      )

      // Create the serverless function's configuration file.
      await outputFile(
        path.join(functionDir, ".vc-config.json"),
        CONFIG_SERVERLESS_FUNCTION
      );
      
      // Get the dependencies.
      const traceResult = await nodeFileTrace([
        path.join(functionDir, 'index.js'),
      ])

      // Add them to the serverless function's directory.
      for (const file of traceResult.fileList) {
        if (!file.includes('node_modules')) return;
        const outFile = path.join(functionDir, file)
        await copy(file, outFile)
      }

      // Copy `static` folder to serve them as static.
      await copyDir(clientOutDir, path.join(vercelDir, 'static'));
    }
  }
}
