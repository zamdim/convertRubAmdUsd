import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import svgrPlugin from 'vite-plugin-svgr';
import checker from 'vite-plugin-checker';

export default defineConfig({
  base: '/converter/',
  plugins: [
    react(),
    viteTsconfigPaths(),
    svgrPlugin(),
    checker({
      typescript: true,
    }),
  ],
  css: {
    modules: {
      generateScopedName: '[folder]__[local]__[hash:8]',
    },
  },
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
});
