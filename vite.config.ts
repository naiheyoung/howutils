import { defineConfig } from 'vite'
import { VitePluginNode } from 'vite-plugin-node'
import dts from 'rollup-plugin-dts'
import esbuild from 'rollup-plugin-esbuild'

export default defineConfig({
  define: {
    __NODE__: process.env.BUILD_TARGET === 'node'
  },
  build: {
    lib: {
      entry: './src/index.ts',
      name: 'howutils',
      fileName: (format) => `howutils${format}.js`
    },
    rollupOptions: {
      external: ['fs/promises', 'path', 'gray-matter', 'markdown-it'],
      input: './src/index.ts',
      output: {
        globals: {
          'fs/promises': 'fs',
          'path': 'path',
          'gray-matter': 'matter',
          'markdown-it': 'markdownit'
        },
        entryFileNames: 'index.d.ts',
        format: 'esm',
      }
    }
  },
  plugins: [
    ...VitePluginNode({
      adapter: 'express',
      appPath: './src/index.ts'
    }),
    dts({
      respectExternal: true
    }),
    esbuild({
      target: 'esnext'
    })
  ]
})