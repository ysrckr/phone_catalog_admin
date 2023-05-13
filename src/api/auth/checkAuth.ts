import { axiosAdminClient } from '@/utils/axiosClient';

export const checkAuth = (id: string) => {
  return axiosAdminClient.get('/check').then(response => response.data);
};
