'use client'
import AuthCard from '@/app/auth/AuthCard'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  Form,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { signUpSchema } from '@/schemas/index'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { signup } from '@/actions/signup'
import { useState } from 'react'
import FormError from '@/app/components/FormError'
import FormSucces from '@/app/components/FormSucces'
import { useRouter } from 'next/navigation'

const SignupForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, seterror] = useState('')
  const [success, setsuccess] = useState('')
  const router = useRouter()

  const form = useForm<z.infer<typeof signUpSchema>>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  })

  async function signupSubmit(values: z.infer<typeof signUpSchema>) {
    seterror('')
    setsuccess('')
    setIsSubmitting(true)
     await signup(values)
      .then((res) => {
        setIsSubmitting(false)
        if (!res.success && res.message) {
           return seterror(res.message)
        }
        setsuccess(res.message)
         return router.push(`/auth/login?success=true`)
      })
      .catch((err) => {
        console.log("ERR",err);
        setIsSubmitting(false)
        return seterror('Something went wrong')
      })
  }
  return (
    <AuthCard
      cardTitle="Inscription"
      description="Créer un compte utilisateur sur la plateforme"
      cardFooterLinkHref="/auth/login"
      cardFooterText="Déjà un compte ?"
      cardFooterLinkText="Connectez-vous"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(signupSubmit)} className=" space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom complet</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    type="text"
                    placeholder="John Doe"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
                    type="email"
                    placeholder="john@gmail.com"
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
                <FormLabel>Mot de pass</FormLabel>
                <FormControl>
                  <Input
                    disabled={isSubmitting}
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
            disabled={isSubmitting}
            className="bg-green-500 w-full"
            type="submit"
          >
            {"S'inscrire"}
          </Button>
        </form>
      </Form>
    </AuthCard>
  )
}

export default SignupForm
