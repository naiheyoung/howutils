import { defineConfig } from 'vite'
import { VitePluginNode } from 'vite-plugin-node'
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
        format: 'esm',
      }
    }
  },
  plugins: [
    ...VitePluginNode({
      adapter: 'express',
      appPath: './src/index.ts'
    }),
    esbuild({
      target: 'esnext'
    })
  ]
})