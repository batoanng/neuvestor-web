import { PropsWithChildren } from 'react';
import { SnackbarAlert } from './SnackbarAlert';
import { SnackbarProvider, SnackbarProviderProps } from 'notistack';

export const SnackbarProviderWrapper = ({ children, ...props }: PropsWithChildren<SnackbarProviderProps>) => (
  <SnackbarProvider
    transitionDuration={{ enter: 800 }}
    autoHideDuration={4000}
    maxSnack={1}
    anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
    Components={{
      snackbarAlert: SnackbarAlert,
    }}
    {...props}
  >
    {children}
  </SnackbarProvider>
);
