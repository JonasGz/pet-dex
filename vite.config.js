/// <reference types="vitest" />
// vite.config.js
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import jsconfigPaths from 'vite-jsconfig-paths';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  server: {
    host: '0.0.0.0',
    port: 5173,
  },
  root: resolve(__dirname, 'src/layouts/'),
  define: {
    __isBrowser__: true,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    root: resolve(__dirname, ''),
    coverage: {
      include: ['src/**/*.js'],
      exclude: ['src/**/*.spec.js'],
      reportOnFailure: true,
      thresholds: {
        lines: 0,
        statements: 0,
        branches: 0,
        functions: 0,
      },
      reporter: ['text', 'lcov', 'html', 'json', 'json-summary'],
    },
    include: ['src/**/*.spec.js'],
    setupFiles: ['src/__tests__/setup.js'],
  },
  build: {
    outDir: resolve(__dirname, 'dist'),
    rollupOptions: {
      input: {
        index: resolve(__dirname, 'src/layouts/index.html'),
        teste: resolve(__dirname, 'src/layouts/sample-page/index.html'),
      },
    },
  },
  resolve: {
    alias: {
      '~src': resolve(__dirname, 'src'),
      '~styles': resolve(__dirname, 'src/styles'),
      '~stories': resolve(__dirname, 'src/stories'),
      '~layouts': resolve(__dirname, 'src/layouts'),
    },
  },
  plugins: [
    VitePWA({
      manifest: {
        name: 'PetDex',
        short_name: 'PetDex',
        icons: [
          {
            src: '/favicon/android-icon-36x36.ico',
            sizes: '36x36',
            type: 'image/x-ico',
          },
          {
            src: '/favicon/android-icon-48x48.ico',
            sizes: '48x48',
            type: 'image/x-ico',
          },
          {
            src: '/favicon/android-icon-72x72.ico',
            sizes: '72x72',
            type: 'image/x-ico',
          },
          {
            src: '/favicon/android-icon-96x96.ico',
            sizes: '96x96',
            type: 'image/x-ico',
          },
          {
            src: '/favicon/android-icon-144x144.ico',
            sizes: '144x144',
            type: 'image/x-ico',
          },
          {
            src: '/favicon/android-icon-192x192.ico',
            sizes: '192x192',
            type: 'image/x-ico',
          },
        ],
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
      },
    }),
    jsconfigPaths(),
  ],
});
