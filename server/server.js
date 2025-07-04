import { buildServer } from '@batoanng/frontend-server';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

// load env
const env = process.env.NODE_ENV?.toLowerCase() ?? 'development';
const executionPath = dirname(fileURLToPath(import.meta.url));
const clientBuildPath = join(executionPath, '../build');

const { APP_API_TARGET_SERVER: targetServerUrl, PORT: port = 3000, APP_BASE_URL, NR_APP_ID } = process.env;

const allowedOrigins = new Set([APP_BASE_URL]);

if (env === 'development') {
  allowedOrigins.add('http://localhost:3000');
}

const newRelic = NR_APP_ID ? { applicationId: NR_APP_ID } : undefined;

const { server } = buildServer({
  nodeEnv: env,
  targetServerUrl,
  clientBuildPath,
  cspOptions: {
    services: ['google-fonts', 'google-analytics', 'newrelic'],
    connectSrcElements: ['https://*.auth0.com'],
    styleSrcElements: ["'unsafe-inline'"],
  },
  newRelic,
  corsOptions: { allowedOrigins: Array.from(allowedOrigins) },
});

server.listen(port, () => {
  console.log(`App Server is running on port ${port}`);
});
