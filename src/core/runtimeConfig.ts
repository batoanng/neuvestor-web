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
  environmentName: import.meta.env.VITE_ENVIRONMENT_NAME ?? '',
  routerBaseName: import.meta.env.VITE_ROUTER_BASE_NAME ?? '',

  appUrl: import.meta.env.VITE_APP_URL ?? window.location.href,

  api: {
    url: import.meta.env.VITE_API_URL || '',
  },

  analytics: {
    googleKey: import.meta.env.VITE_GA_KEY ?? '',
  },

  isDevelopment: import.meta.env.DEV,

  oidc: {
    authority: import.meta.env.VITE_OIDC_AUTHORITY || '',
    clientId: import.meta.env.VITE_OIDC_CLIENT_ID || '',
  },
};

const { environmentName } = runtimeConfig;
if (environmentName) {
  document.title = document.title + ` (${environmentName})`;
}
