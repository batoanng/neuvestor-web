import { IdleTimer as BaseIdleTimer } from '@batoanng/mui-components';
import { runtimeConfig } from '@/core/runtimeConfig';
import { useAuthorisationContext } from '@batoanng/oidc';

export const IdleTimer = () => {
  const { onLogout, isAuthenticated } = useAuthorisationContext();

  return <BaseIdleTimer disabled={!isAuthenticated || runtimeConfig.isDevelopment} logoutUser={onLogout} />;
};
