import { useAuthorisationContext } from '@/core/auth';
import { IdleTimer as BaseIdleTimer } from '@batoanng/mui-components';
import { runtimeConfig } from '@/core';

export const IdleTimer = () => {
  const { onLogout, isAuthenticated } = useAuthorisationContext();

  return <BaseIdleTimer disabled={!isAuthenticated || runtimeConfig.isDevelopment} logoutUser={onLogout} />;
};
