'use server'
import { signIn } from '@/auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { loginSchema } from '@/schemas'
import * as z from 'zod'

export const login = async (values: z.infer<typeof loginSchema>) => {
  const validVAlues = loginSchema.safeParse(values)

  if (!validVAlues.success) {
    return { success: false, message: 'Invalid credantials' }
  }

  const { email, password } = validVAlues.data

  await signIn('credentials', {
    email,
    password,
  })

  
}
