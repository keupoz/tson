import sucrase from '@rollup/plugin-sucrase'
import { defineConfig } from 'rollup'
import dts from 'rollup-plugin-dts'

export default defineConfig([
  {
    input: 'src/lib/index.ts',
    output: {
      format: 'cjs',
      file: 'dist/TSON.cjs.js'
    },
    treeshake: true,
    plugins: [sucrase({
      exclude: ['node_modules'],
      transforms: ['typescript']
    })]
  },
  {
    input: 'src/lib/index.ts',
    output: {
      format: 'esm',
      file: 'dist/TSON.esm.js'
    },
    treeshake: true,
    plugins: [sucrase({
      exclude: ['node_modules'],
      transforms: ['typescript']
    })]
  },
  {
    input: 'src/lib/index.ts',
    output: [{
      format: 'esm',
      file: 'dist/TSON.cjs.d.ts'
    },
    {
      format: 'esm',
      file: 'dist/TSON.esm.d.ts'
    }],
    treeshake: true,
    plugins: [dts()]
  }
])
