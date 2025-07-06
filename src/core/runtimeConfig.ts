export interface RuntimeConfig {
  environmentName?: string;
  routerBaseName: string;

  /** The runtime URL for the app. All app paths should be relative to this. */
  appUrl: string; 

  api: {
    url: string;
  };

  analytics: {
    googleKey: string;
  };

  /** Configurable OIDC settings */
  oidc: {
    authority: string;
    clientId: string;
  };

  isDevelopment: boolean;
}

export const runtimeConfig: RuntimeConfig = {
  environmentName: window.process.env.VITE_ENVIRONMENT_NAME ?? '',
  routerBaseName: window.process.env.VITE_ROUTER_BASE_NAME ?? '',

  appUrl: window.process.env.VITE_APP_URL ?? window.location.href,

  api: {
    url: window.process.env.VITE_API_URL || '',
  },

  analytics: {
    googleKey: window.process.env.VITE_GA_KEY ?? '',
  },

  isDevelopment: import.meta.env.DEV,

  oidc: {
    authority: window.process.env.VITE_OIDC_AUTHORITY || '',
    clientId: window.process.env.VITE_OIDC_CLIENT_ID || '',
  },
};

const { environmentName } = runtimeConfig;
if (environmentName) {
  document.title = document.title + ` (${environmentName})`;
}
