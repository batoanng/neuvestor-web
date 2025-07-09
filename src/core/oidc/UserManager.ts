import { UserManager as OidcUserManager } from 'oidc-client';
import { Store } from 'redux';
import { createUserManager, loadUser, UserState } from 'redux-oidc';
import urlJoin from 'url-join';

export interface OidcConfig {
  /**
   * The URL of the OIDC/OAuth2 provider
   */
  authority: string;

  /**
   * Your client application's identifier as registered with the OIDC/OAuth2
   */
  clientId: string;

  /**
   * The fully qualified path to your application's root URL
   */
  appUrl: string;

  /**
   * The path (relative to the application's root URL) to navigate to after sign in succeeds.
   */
  signInCallbackPath: string;

  /**
   * The path (relative to the application's root URL) to navigate to after sign out succeeds.
   */
  signOutCallbackPath: string;

  /**
   * Scopes to request from the OIDC server. Defaults to `openid profile email offline_access`.
   */
  scope?: string;
}

export interface OidcStoreState {
  oidc: UserState;
}

let userManager: OidcUserManager;

/**
 * Initialize the userManager singleton and attempt to load the user.
 * @param store The redux store containing the OIDC reducer
 * @param config The configuration to pass to the user manager
 */
const init = async <TState extends OidcStoreState>(store: Store<TState>, config: OidcConfig) => {
  const signInRedirectUri = urlJoin(config.appUrl, config.signInCallbackPath);
  const signOutRedirectUri = urlJoin(config.appUrl, config.signOutCallbackPath);

  userManager = createUserManager({
    authority: config.authority,
    client_id: config.clientId,
    redirect_uri: signInRedirectUri,
    post_logout_redirect_uri: signOutRedirectUri,
    response_type: 'code',
    scope: Boolean(config.scope) ? config.scope : 'openid profile email offline_access',
    automaticSilentRenew: true,
  });

  try {
    await loadUser(store, userManager);
  } catch (err) {
    console.warn('Error loading user', err);
  }
};

export const UserManager = {
  instance: () => userManager,
  init,
};
