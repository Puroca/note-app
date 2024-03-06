'use server'
import { signIn } from '@/auth'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { loginSchema } from '@/schemas'
import { AuthError } from 'next-auth'
import * as z from 'zod'

export const login = async (values: z.infer<typeof loginSchema>) => {
  const validVAlues = loginSchema.safeParse(values)

  if (!validVAlues.success) {
    return { success: false, message: 'Invalid credantials' }
  }

  const { email, password } = validVAlues.data

  try {
    await signIn('credentials', {
      email,
      password,
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { success: false, message: 'Invalid credentials.' }
        default:
          return { success: false, message: 'Something went wrong.' }
      }
    }
  } finally {
    await signIn('credentials', {
      email,
      password,
    }).catch(() => {})
  }
}
