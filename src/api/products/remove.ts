import { axiosAdminClient } from '@/utils/axiosClient';

export const remove = (id: string) => {
  return axiosAdminClient.delete(`/products/${id}`).then(res => res.data);
};
