'use server'

import { signUpSchema } from '@/schemas'
import * as z from 'zod'

export const signup = async (data: z.infer<typeof signUpSchema>) => {
  const userData = signUpSchema.safeParse(data)
  if (userData.success) {
    const user = userData.data

    const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })

    const response = await res.json()
    return response
  }

  return { success: false, message: 'Something went wrong' }
}
