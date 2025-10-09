import { z } from 'zod'

export const getSchema = (t: (key: string) => string) => (z.object({
  email: z.email(t('emailError')),
  password: z.string().min(1, t('placeholder')),
}))

export type FormValues = z.infer<ReturnType<typeof getSchema>>;
