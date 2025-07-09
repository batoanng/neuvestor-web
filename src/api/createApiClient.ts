import { runtimeConfig } from '@/core/runtimeConfig';
import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import * as AxiosLogger from 'axios-logger';

export type UnauthorizedRequestHandler = (client: AxiosInstance, error: AxiosError) => Promise<unknown>;

interface CreateClientConfig extends ApiClientConfig {
  baseUrl: string;
  enableLogging?: boolean;
}

interface ApiClientConfig {
  tenantId?: string | null;
  accessToken?: string | string[] | null;
  onUnauthorizedRequest?: UnauthorizedRequestHandler;
}

type ApiClient = AxiosInstance & ApiClientConfig;

class PayloadError extends Error {
  public readonly status?: number;
  public readonly payload: unknown;
  public readonly correlationId?: string;

  constructor(status: number | undefined, message: string | undefined, payload: unknown, correlationId?: string) {
    super(message);
    this.status = status;
    this.payload = payload;
    this.correlationId = correlationId;
  }
}

const createApiClient = ({ baseUrl, enableLogging, ...config }: CreateClientConfig): AxiosInstance => {
  const client = axios.create({
    baseURL: baseUrl,
    paramsSerializer: {
      indexes: null,
    },
  }) as ApiClient;

  //   addCorrelationIdMiddleware(client);
  setBearerToken(client, config.accessToken);
  setUnauthorizedRequestHandler(client, config.onUnauthorizedRequest);

  client.interceptors.request.use((request) => {
    if (Array.isArray(client.accessToken)) {
      const [scheme, token] = client.accessToken;
      request.headers.Authorization = `${scheme} ${token}`;
    } else {
      request.headers.Authorization = client.accessToken ? `Bearer ${client.accessToken}` : null;
    }

    request.headers['x-tenant-id'] = client.tenantId || null;

    return enableLogging
      ? (AxiosLogger.requestLogger(request, { headers: true }) as InternalAxiosRequestConfig<unknown>)
      : request;
  });

  client.interceptors.response.use(
    (response) => {
      const isSuccess = response.status >= 200 && response.status < 300;
      if (!isSuccess) {
        let message: string | null = null;
        if (!/html/i.test(response.headers.ContentType)) {
          message = response.data;
        }

        console.warn(response.statusText, message);
      }

      return enableLogging ? AxiosLogger.responseLogger(response, { headers: true }) : response;
    },

    async (error: AxiosError) => {
      if (error.isAxiosError) {
        if (error.response?.status === 401 && client.onUnauthorizedRequest) {
          const clientResponse = await client.onUnauthorizedRequest(client, error);
          if (clientResponse && clientResponse !== error) {
            return clientResponse;
          }
        }

        // This is the error that gets raised if the request is cancelled by an abort controller.
        if (error.code === AxiosError.ERR_CANCELED) return;

        console.error(
          `${error.config?.method?.toUpperCase()} ${error.request.responseURL} ${error.response?.status}:`,
          error.response?.data
        );

        if (typeof error.response?.data === 'object') {
          throw new PayloadError(
            error.status,
            error.message,
            error.response.data,
            error.config?.headers['x-correlation-id']
          );
        }
      }

      if (enableLogging) {
        await AxiosLogger.errorLogger(error, {
          headers: true,
        });
      }

      throw error;
    }
  );

  return client;
};

export const setBearerToken = (axiosClient: AxiosInstance, token?: string | string[] | null) => {
  (axiosClient as ApiClient).accessToken = token;
};

export const setTenantId = (axiosClient: AxiosInstance, tenantId?: string | null): void => {
  (axiosClient as ApiClient).tenantId = tenantId;
};

export const setUnauthorizedRequestHandler = (axiosClient: AxiosInstance, handler?: UnauthorizedRequestHandler) => {
  (axiosClient as ApiClient).onUnauthorizedRequest = handler;
};

export const apiClient = createApiClient({
  baseUrl: runtimeConfig.api.url,
});
