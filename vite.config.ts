import { defineConfig, splitVendorChunkPlugin } from 'vite'
import react from '@vitejs/plugin-react'
import legacy from '@vitejs/plugin-legacy'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr(),
    splitVendorChunkPlugin(),
    legacy({
      targets: ['IE >= 11'],
      additionalLegacyPolyfills: ['whatwg-fetch'],
    }),
  ],
  resolve: {
    alias: {
      src: '/src',
    },
  },
  server: {
    port: 4000,
    strictPort: true,
  },
  preview: {
    port: 3000,
    strictPort: true,
  },
})
