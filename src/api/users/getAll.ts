import { axiosAdminClient } from '@/utils/axiosClient';

export const getAllUsers = async () => {
  try {
    const { data } = await axiosAdminClient.get('/users');
    return data;
  } catch (error) {
    throw error;
  }
};
