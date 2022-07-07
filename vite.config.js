import { resolve } from 'path';
import { defineConfig } from 'vite';
import { getBabelOutputPlugin } from '@rollup/plugin-babel';

export default defineConfig({
  resolve: {
    alias: {
      'Src': resolve(__dirname, './src')
    }
  },
  server: {
    fs: {
      allow: ['.']
    }
  },
  build: {
    rollupOptions: {
      input: {
        init: 'src/init.ts',
        userIdMap: 'src/userIdMap.ts',
        customEventListener: 'src/initCel.ts',
        customEventDispatcher: 'src/customEventDispatcher.ts'
      },
      plugins: [
        getBabelOutputPlugin({
          presets: ['@babel/preset-env']
        })
      ],
      output: {
        entryFileNames: '[name].min.js'
      }
    }
  }
});