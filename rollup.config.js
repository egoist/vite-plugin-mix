import sucrase from '@rollup/plugin-sucrase'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import replace from '@rollup/plugin-replace'
import ts from "rollup-plugin-ts";
import pkg from './package.json'

const tsTransform = sucrase({
  transforms: ['typescript'],
})

/** @type {import('rollup').RollupOptions[]} */
const configs = [
  {
    input: './src/index.ts',
    output: { file: "dist/index.js" },
    plugins: [ts({ hook: { outputPath: () => "dist/index.d.ts" }})],
  },
  {
    input: './src/index.ts',
    output: {
      format: 'esm',
      file: 'dist/index.mjs',
      exports: 'named',
    },
    plugins: [tsTransform, commonjs(), nodeResolve(), replace({
      preventAssignment: true,
      "__dirname": "new URL('.', import.meta.url).pathname"
    })],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
    ],
  },
  {
    input: './src/index.ts',
    output: {
      format: 'cjs',
      file: "dist/index.cjs",
      exports: 'named',
    },
    plugins: [tsTransform, commonjs(), nodeResolve()],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
    ],
  },
  {
    input: ['./src/runtime/server.ts', './src/runtime/vercel-render.ts'],
    output: {
      format: 'esm',
      dir: './dist/runtime',
    },
    plugins: [tsTransform, commonjs(), nodeResolve()],
  }
]

export default configs
