import { z } from 'zod'

// ProductCreateForm
export const productSchema = z.object({
  name: z.string().nonempty({ message: 'Product name is required' }),
  price: z.string().min(0, { message: 'Price must be a positive number' }),
  description: z.string().nonempty({ message: 'Description is required' }),
  images: z
    .array(z.instanceof(File))
    .nonempty({ message: 'Images are required' }),
  slug: z.string().nonempty({ message: 'Product slug is required' }),
  category: z.string().nonempty({ message: 'Category is required' }),
})

export type TProductSchema = z.infer<typeof productSchema>

// UserUpdateForm
export const userUpdateSchema = z.object({
  email: z.string().email({
    message: 'Invalid email address.',
  }),
  name: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  role: z.enum(['admin', 'user']),
  address: z.string().readonly(),
  detail_address: z.string(),
})

export type TUserUpdateSchema = z.infer<typeof userUpdateSchema>

// ReviewForm
export const reviewFormSchema = z.object({
  content: z.string().min(10, {
    message: 'Review must be at least 5 characters.',
  }),
  rate: z
    .number()
    .min(1, {
      message: 'Rate must be at least 1.',
    })
    .max(5, {
      message: 'Rate must not be higher than 5.',
    }),
})

export type TReviewFormSchema = z.infer<typeof reviewFormSchema>

// ReviewEditForm
export const reviewEditFormSchema = z.object({
  rate: z
    .number()
    .min(1, {
      message: 'Rate must be at least 1.',
    })
    .max(5, {
      message: 'Rate must not be higher than 5.',
    }),
  content: z.string().min(10, {
    message: 'Review must be at least 5 characters.',
  }),
})

export type TReviewEditFormSchema = z.infer<typeof reviewEditFormSchema>

// AppearanceForm
export const appearanceFormSchema = z.object({
  theme: z.enum(['light', 'dark'], {
    required_error: 'Please select a theme.',
  }),
  font: z.enum(['inter', 'manrope', 'system'], {
    invalid_type_error: 'Select a font',
    required_error: 'Please select a font.',
  }),
})

export type TAppearanceFormValues = z.infer<typeof appearanceFormSchema>

// ProfileForm
export const profileFormSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Username must be at least 2 characters.',
    })
    .max(30, {
      message: 'Username must not be longer than 30 characters.',
    }),
  email: z.string().email({
    message: 'Please enter a valid email format.',
  }),
  address: z.string().readonly(),
  detail_address: z.string(),
})

export type TProfileFormSchema = z.infer<typeof profileFormSchema>

export const signupSchema = z.object({
  email: z.string().email('이메일 형식이 올바르지 않습니다.'),
  password: z.string().min(8, '비밀번호는 최소 8자리 이상이어야 합니다.'),
  name: z
    .string()
    .regex(/^[a-zA-Z0-9_]+$/, '닉네임은 알파벳, 숫자, 밑줄만 허용합니다.'),
})

export type TSignupSchema = z.infer<typeof signupSchema>
