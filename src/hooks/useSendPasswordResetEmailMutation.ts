import { MutationOptions, useMutation } from '@tanstack/react-query';
import { apiClient } from '@/api';

const sendPasswordResetEmail = async (email: string): Promise<void> => {
  const { data } = await apiClient.post<void>(`v1/user/resetPassword/?emailAddress=${email}`);
  return data;
};

type Options = MutationOptions<void, Error, string>;

export const useSendPasswordResetEmailMutation = (options = {} as Options) => {
  return useMutation({
    mutationFn: sendPasswordResetEmail,
    ...options,
  });
};
