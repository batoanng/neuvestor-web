import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage } from '@/pages/home/HomePage';
import { setupGoogleAnalytics, Providers, runtimeConfig } from '@/core';

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
