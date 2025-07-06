import { InPageAlert } from '@batoanng/mui-components';
import { CustomContentProps, SnackbarContent } from 'notistack';
import { forwardRef } from 'react';

export type AlertVariant = 'info' | 'error' | 'success' | 'warning';

interface SnackbarAlertProps extends CustomContentProps {
  alertVariant: AlertVariant;
  title: string;
  message: string;
}

export const SnackbarAlert = forwardRef<HTMLDivElement, SnackbarAlertProps>(
  ({ id, alertVariant, title, message, ...other }, ref) => {
    return (
      <SnackbarContent ref={ref} {...other}>
        <InPageAlert variant={alertVariant} title={title}>
          {message}
        </InPageAlert>
      </SnackbarContent>
    );
  }
);
