import { axiosAdminClient } from '@/utils/axiosClient';

export const remove = (email: string) =>
  axiosAdminClient
    .delete(`/users`, {
      data: { email },
    })
    .then(res => res.data)
    .catch(err => { 
      throw err.response.data;
    });
