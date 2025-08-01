import { CssBaseline, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { PropsWithChildren } from 'react';
import { AuthorisationProvider } from '@/core/auth';
import { createDefaultTheme } from '@batoanng/mui-components';
import { createQueryClient } from '@/utils';
import { SnackbarProviderWrapper } from '@/components';

export const queryClient: QueryClient = createQueryClient();

export const Providers = ({ children }: PropsWithChildren) => {
  const theme = createDefaultTheme(true);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthorisationProvider>
          <SnackbarProviderWrapper>{children}</SnackbarProviderWrapper>
          <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" />
        </AuthorisationProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};
