import dts from 'rollup-plugin-dts'

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.d.ts',
    format: 'esm',
  },
  plugins: [
    dts({
      respectExternal: true,
    }),
  ],
}
