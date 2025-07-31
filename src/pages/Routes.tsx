import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from '@/pages/home';
import { setupGoogleAnalytics, Providers } from '@/core';
import { runtimeConfig } from '@/core/runtimeConfig';

setupGoogleAnalytics(runtimeConfig.analytics.googleKey);

export const Root = () => {
  return (
    // <ErrorBoundary>
    <Providers>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Providers>
    // </ErrorBoundary>
  );
};
