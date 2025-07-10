import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => {
  return {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    build: {
      outDir: 'build',
      target: 'esnext',
      rollupOptions: {
        output: {
          manualChunks: (id: string) => {
            if (id.includes('node_modules')) {
              if (id.includes('react') || id.includes('scheduler') || id.includes('remix')) return 'react';
              if (id.includes('mui') || id.includes('emotion')) return 'mui';
              return 'vendor';
            }

            return undefined;
          },
        },
      },
    },
    plugins: [
      react(),
      svgr({
        svgrOptions: {
          typescript: true,
        },
      }),
    ],
    server: {
      port: 8008,
    },
  };
});
