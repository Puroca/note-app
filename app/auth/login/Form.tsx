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
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { redirectTo } from '../redirector'

const LoginForm = () => {
  const [isLoading, setisLoading] = useState(false)
  const [error, seterror] = useState('')
  const [success, setsuccess] = useState()


  
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const loginSubmit = async (values: z.infer<typeof loginSchema>) => {
    const validValues = loginSchema.safeParse(values)
    if (validValues.success) {
      setisLoading(true)
      await login(validValues.data)
        .then(() => {          
          
        })
        .catch(() => {})
    }

    return seterror('Invalid fields')
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
                  <Input type="password" placeholder="******" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="bg-green-500 w-full">
            Se connecter
          </Button>
        </form>
      </Form>
    </AuthCard>
  )
}

export default LoginForm
