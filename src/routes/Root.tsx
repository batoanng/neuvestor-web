import { ErrorBoundary } from '@dcs-partner-portal/components';
import { Route, Routes } from 'react-router-dom';

import { Providers } from '@/core/Providers';
import { runtimeConfig } from '@/core/runtimeConfig';
import { setupGoogleAnalytics, useAnalyticsPageView } from '@/core/services/analytics';
import { HomePage } from '@/routes/home/HomePage';

setupGoogleAnalytics(runtimeConfig.analytics.googleKey);

const RootRoute = () => {
  useAnalyticsPageView();

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
    </Routes>
  );
};

export const Root = () => {
  return (
    <ErrorBoundary>
      <Providers>
        <RootRoute />
      </Providers>
    </ErrorBoundary>
  );
};
