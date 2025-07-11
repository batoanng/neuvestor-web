import { apiClient } from '@/api';
import { useSignedInUserQuery, useUserPrivilegesQuery } from './hooks';
import { type PropsWithChildren, useMemo } from 'react';
import { OidcAuthorisationCallback, useEnsureOidcLoginToken, UserInformation } from '@batoanng/oidc';

export const AuthorisationCallback = ({ children }: PropsWithChildren) => {
  useEnsureOidcLoginToken();

  const { data: signedInUser, error: userInformationError } = useSignedInUserQuery();
  const role = signedInUser?.roles ? Object.values(signedInUser.roles)[0] : '';

  const userInformation = useMemo(() => {
    if (!signedInUser) return undefined;

    const { firstName, lastName, email } = signedInUser;

    const userInformation: UserInformation = {
      shortName: firstName,
      fullName: `${firstName} ${lastName}`,
      email: email,
      role,
    };

    return userInformation;
  }, [role, signedInUser]);

  const { data: privileges, error: privilegesError } = useUserPrivilegesQuery();

  return (
    <OidcAuthorisationCallback
      apiClient={apiClient}
      userInformation={userInformation}
      privileges={privileges}
      error={userInformationError || privilegesError}
    >
      {children}
    </OidcAuthorisationCallback>
  );
};
