import { AlertVariant } from './SnackbarAlert';

declare module 'notistack' {
  interface VariantOverrides {
    snackbarAlert: {
      alertVariant: AlertVariant;
      title: string;
    };
  }
}
