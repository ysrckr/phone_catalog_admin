import { z } from 'zod';
// import { userSchema } from '../../../server/src/types/User';

export const loginUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type LoginUser = z.infer<typeof loginUserSchema>;

export const CreateUserSchema = z
  .object({
    name: z.string().min(3).max(50),
    email: z.string().email(),
    password: z.string().min(8).max(50),
    confirmPassword: z.string().min(8).max(50),
    role: z.enum(['ADMIN', 'USER', 'Choose A Role']),
  })
  .superRefine(({ confirmPassword, password, name, email }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
      });
    }
  });

export type CreateUser = z.infer<typeof CreateUserSchema>;
