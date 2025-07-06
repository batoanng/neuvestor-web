import type { PropsWithChildren } from 'react';
import urlJoin from 'url-join';
import { runtimeConfig } from '@/core';
import { useSendPasswordResetEmailMutation } from '@/hooks';
import { IdleTimer } from '@/components';
import { UserManagerSettings } from 'oidc-client-ts';
import { OidcAuthorisationProvider } from '../oidc/OidcAuthorisationProvider';
import { AuthorisationCallback } from './AuthorisationCallback';

const redirectUri = urlJoin(runtimeConfig.appUrl, '/oidc/callback');
const postLogoutUri = urlJoin(runtimeConfig.appUrl, '/oidc/logout');

const userManagerSettings: UserManagerSettings = {
  authority: runtimeConfig.oidc.authority,
  client_id: runtimeConfig.oidc.clientId,
  scope: 'openid profile email offline_access',
  redirect_uri: redirectUri,
  post_logout_redirect_uri: postLogoutUri,
  extraQueryParams: {
    // The audience has to match the audience for the API so that Auth0 generates a proper JWT for
    // the access token, instead of an opaque token.
    // See: https://community.auth0.com/t/why-access-token-is-not-a-jwt-opaque-token/31028
    // audience: 'https://localhost:7002/',
  },
};

export const AuthorisationProvider = ({ children }: PropsWithChildren) => {
  const { mutateAsync } = useSendPasswordResetEmailMutation();
  return (
    <OidcAuthorisationProvider userManagerSettings={userManagerSettings} onPasswordReset={mutateAsync}>
      <AuthorisationCallback>
        <IdleTimer />
        {children}
      </AuthorisationCallback>
    </OidcAuthorisationProvider>
  );
};
