import { useEffect } from 'react';
import ReactGA from 'react-ga4';
import { UaEventOptions } from 'react-ga4/types/ga4';
import { useLocation } from 'react-router-dom';

export const setupGoogleAnalytics = (googleKey?: string) => {
  if (googleKey) {
    ReactGA.initialize(googleKey);
  }
};

export const logEvent = (optionsOrName: string | UaEventOptions, params?: unknown) => {
  ReactGA.event(optionsOrName, params);
};

export const useAnalyticsPageView = () => {
  const history = useLocation();

  useEffect(() => {
    ReactGA.set({ page: window.location.pathname });
    ReactGA.send({ hitType: 'pageview', page: window.location.pathname });
  }, [history]);
};

export const setUser = (user: unknown) => {
  ReactGA.set({ user });
};

export const clearUser = () => {
  ReactGA.set({ user: undefined });
};
