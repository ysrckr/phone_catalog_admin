import { axiosAdminClient } from '@/utils/axiosClient';
import { CreateUser } from '@/types/user';

export const createUser = async (
  data: CreateUser,
): Promise<any> => {
  return await axiosAdminClient.post('/register', {
    body: {
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
    },
  });
};
