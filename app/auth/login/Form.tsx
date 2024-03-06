'use client'

import { login } from '@/actions/login'
import AuthCard from '@/app/auth/AuthCard'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { loginSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter} from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { redirectTo } from '../redirector'
import FormError from '@/app/components/FormError'
import FormSucces from '@/app/components/FormSucces'
import { AuthError } from 'next-auth'

const LoginForm = () => {
  const [isLoading, setisLoading] = useState(false)
  const [error, seterror] = useState('')
  const [success, setsuccess] = useState('')
  const router = useRouter()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const loginSubmit = async (values: z.infer<typeof loginSchema>) => {
    seterror('')
    setsuccess('')
    const validValues = loginSchema.safeParse(values)
    if (!validValues.success) {
      return seterror('Invalid fields')
    }
    setisLoading(true)
    await login(validValues.data)
      .then((res) => {
        setisLoading(false)
        if (res && !res.success) {
          return seterror(res.message)
        }

        setsuccess('Compte créé avec succès.')
        router.refresh()
      })
      .catch(() => {
        setisLoading(false)
        return seterror('Something went wrong!')
      })
  }
  return (
    <AuthCard
      cardTitle="Connexion"
      description="Connectez-vous à votre compte"
      cardFooterText="Pas encore inscrit(e)?"
      cardFooterLinkText="Inscrivez-vous"
      cardFooterLinkHref="/auth/signup"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(loginSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    type="text"
                    placeholder="john@example.com"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mot de passe</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    type="password"
                    placeholder="******"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormError message={error} />
          <FormSucces message={success} />
          <Button
            disabled={isLoading}
            type="submit"
            className="bg-green-500 w-full"
          >
            Se connecter
          </Button>
        </form>
      </Form>
    </AuthCard>
  )
}

export default LoginForm
