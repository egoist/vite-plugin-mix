import sucrase from '@rollup/plugin-sucrase'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import dts from 'rollup-plugin-dts'
import pkg from './package.json'

const tsTransform = sucrase({
  transforms: ['typescript'],
})

/** @type {import('rollup').RollupOptions[]} */
const configs = [
  {
    input: './src/index.ts',
    output: {
      format: 'cjs',
      dir: './dist',
      exports: 'named',
    },
    plugins: [tsTransform, commonjs(), nodeResolve()],
    external: [
      ...Object.keys(pkg.dependencies || {}),
      ...Object.keys(pkg.peerDependencies || {}),
    ],
  },
  {
    input: './src/index.ts',
    output: {
      format: 'esm',
      dir: './dist',
    },
    plugins: [dts()],
  },
  {
    input: ['./src/runtime/server.ts', './src/runtime/vercel-render.ts'],
    output: {
      format: 'esm',
      dir: './dist/runtime',
    },
    plugins: [tsTransform, commonjs(), nodeResolve()],
  },
]

export default configs
