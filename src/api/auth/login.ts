
import { z } from 'zod';
import { axiosAdminClient } from '@/utils/axiosClient';

export const emailShema = z.string().email();
export const passwordShema = z.string().min(8);

export type Email = z.infer<typeof emailShema>;
export type Password = z.infer<typeof passwordShema>;

export type LoginData = {
  email: Email;
  password: Password;
};

export const login = (data: LoginData) => {
  return axiosAdminClient.post("/login", data).then((res) => res.data);
}