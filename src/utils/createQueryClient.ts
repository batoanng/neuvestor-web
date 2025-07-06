import { QueryClient, QueryClientConfig } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { getNormalisedError } from '@batoanng/utils';

const EMPTY_CONFIG: QueryClientConfig = {
  defaultOptions: {
    queries: {},
    mutations: {},
  },
};

export const createQueryClient = (config: QueryClientConfig = EMPTY_CONFIG) => {
  const queries = config.defaultOptions?.queries ?? {};
  const mutations = config.defaultOptions?.mutations ?? {};

  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60_000,
        gcTime: 15 * 60_000,
        retryDelay: (failureCount) => Math.pow(2, failureCount) * 1000,
        retry: (_, error: unknown) => {
          // Network error (eg. internet / API down)
          if (error instanceof AxiosError && error.code === AxiosError.ERR_NETWORK) {
            return false;
          }

          try {
            const status = getNormalisedError(error)?.status ?? null;

            // see: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status
            return (
              status == null ||
              status < 308 || // Permanent redirect
              status === 408 || // timeout
              status === 409
            );
          } catch (retryError) {
            // This is very unlikely - but, we can't let any exceptions go unchecked here, or it will prevent
            // the original exception from being forwarded to the query.
            console.warn('Could not determine retry policy. The query will not be retried.', retryError);
            return false;
          }
        },

        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
        ...queries,
      },
      mutations,
    },
  });
};
