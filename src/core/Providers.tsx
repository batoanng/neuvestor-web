import { ddsTheme, ScrollToTop, SnackbarProviderWrapper } from '@dcs-partner-portal/components';
import { createQueryClient } from '@dcs-partner-portal/net';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PropsWithChildren } from 'react';
import { AuthorisationProvider } from './auth';
import { HelpModalProvider } from '@/contexts';

export const queryClient = createQueryClient();

export const Providers = ({ children }: PropsWithChildren) => {
    const theme = createTheme({})

  return ( 
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
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
