// @ts-ignore
import { fileURLToPath } from 'url';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';

import { createClientEnvFilesPlugin } from '@batoanng/frontend-server';

const validEnvironments = ['development', 'aws-dev', 'aws-sit', 'aws-uat', 'aws-preprod', 'aws-prod'];

export default defineConfig(({ mode }) => {
  const viteEnv = loadEnv(mode, process.cwd());

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
      createClientEnvFilesPlugin({
        validEnvironments,
        buildPath: 'build',
      }),
    ],
    server: {
      port: 8980,
    },
  };
});
