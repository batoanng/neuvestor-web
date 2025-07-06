import { apiClient } from '@/api';
import { UserPrivileges, defaultPrivileges, useAuthorisationContext } from '@/core/oidc';
import { QueryOptions, useQuery } from '@tanstack/react-query';
import { AppUser } from './types';

export const QueryCacheKeys = {
  privileges: 'privileges',
  signedInUser: 'signedInUser',
};

const fetchUserPrivileges = async (token: string): Promise<UserPrivileges> => {
  const { data } = await apiClient.get<UserPrivileges>('v1/signedInUser/privileges', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return data;
};

export const useUserPrivilegesQuery = (options: QueryOptions<UserPrivileges> = {}) => {
  const { token } = useAuthorisationContext();

  return useQuery({
    queryKey: [QueryCacheKeys.privileges],

    queryFn: async () => {
      const privileges = await fetchUserPrivileges(token!);

      return {
        ...defaultPrivileges,
        ...privileges,
      };
    },

    ...options,
    enabled: Boolean(token),
  });
};

export const useSignedInUserQuery = <TUser = AppUser>(
  options: QueryOptions<TUser | null, Error, TUser | null> = {}
) => {
  const { token } = useAuthorisationContext();

  return useQuery({
    queryKey: [QueryCacheKeys.privileges],

    queryFn: async () => {
      const { status, data } = await apiClient.request<TUser>({
        url: 'v1/signedInUser',
        method: 'get',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        validateStatus: (status) => status !== 401 && status !== 403,
      });

      // If we get anything other than a 20x status then we don't have the user's profile - they need to profile connect.
      return data && status < 300 ? data : null;
    },
    ...options,
  });
};
