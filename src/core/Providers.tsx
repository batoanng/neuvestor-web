import { ScrollToTop, SnackbarProviderWrapper } from '@batoanng/mui-components';
import { createQueryClient } from '@dcs-partner-portal/net';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PropsWithChildren } from 'react';
import { AuthorisationProvider } from './auth';
import { HelpModalProvider } from '@/contexts';
import { defaultTheme } from '@batoanng/mui-components';

export const queryClient = createQueryClient();

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={defaultTheme}>
        <CssBaseline />
        <ScrollToTop />
        <HelpModalProvider>
          <AuthorisationProvider>
            <SnackbarProviderWrapper>{children}</SnackbarProviderWrapper>
            <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" />
          </AuthorisationProvider>
        </HelpModalProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
