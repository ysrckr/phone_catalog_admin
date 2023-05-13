import { Category } from '@/types/category';
import { axiosClient } from '@/utils/axiosClient';

export const getAllCategories = async (): Promise<Category[]> => {
  const { data } = await axiosClient.get('/categories');
  return data;
};
