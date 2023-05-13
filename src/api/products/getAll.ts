import { Product } from '@/types/products';
import { axiosClient } from '@/utils/axiosClient';

export interface ProductResponse extends Product {
  id: string;
}

export const getAllProducts = async (): Promise<ProductResponse[]> => {
  const response = await axiosClient.get('/products');
  const data = await response.data;
  return data;
};
