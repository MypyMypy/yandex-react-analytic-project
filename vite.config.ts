import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  server: {
    open: true,
  },
  css: {
    modules: {
      generateScopedName: '[name]__[local]__[hash:8]',
      localsConvention: 'camelCase',
    },
  },
});
