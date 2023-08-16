import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'



// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts({
    outputDir: './dist/types'
  })],
  build: {
    lib: {
      entry: './src/lib/index.ts',
      name: 'front-log',
      fileName: (format: any, entryName: string) => {
        console.log(format, entryName)
        return `${entryName}.${format}.js`
      }
    }
  },
  server: {
    open: true,
    proxy: {
      '/front-log': {
        target: 'https://xxxxxx',
        changeOrigin: true
      }
    }
  }
})
