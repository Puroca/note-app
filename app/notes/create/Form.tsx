'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { NoteSchema, UserInterface } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import NoteCard from './NoteCard'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { createNote } from '@/actions/note'
import FormError from '@/app/components/FormError'
import { useState } from 'react'
import FormSucces from '@/app/components/FormSucces'
import { useRouter } from 'next/navigation'
import NoteLoader from '../NoteLoader'
import { toast } from 'sonner'

export interface UserSession {
  user: any
}

const NoteForm = ({ user }: UserSession) => {
  const [submitting, setSubmitting] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const router = useRouter()

  const form = useForm<z.infer<typeof NoteSchema>>({
    resolver: zodResolver(NoteSchema),
    defaultValues: {
      title: '',
      body: '',
      authorId: user._id,
    },
  })

  const noteSubmit = async (values: z.infer<typeof NoteSchema>) => {
    setSubmitting(true)
    setSuccessMsg('')
    setErrMsg('')
    createNote(values)
      .then((res) => {
        setSubmitting(false)
        if (!res.success) {
          return setErrMsg(res.message)
        }

        setSuccessMsg(res.message)
        toast(`${res.message}`)
        return router.push(`/notes/mine`)
      })
      .catch(() => {
        setSubmitting(false)
        return setErrMsg('Something wen wrong.')
      })
  }
  return (
    <NoteCard back title="Créer une note">
      {submitting && <NoteLoader message="Enregistrement en cours..." />}
      <Form {...form}>
        <form className="space-y-5" onSubmit={form.handleSubmit(noteSubmit)}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Titre</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Ex: Ma première note"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="body"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Contenu</FormLabel>
                <FormControl>
                  <Textarea {...field} placeholder="Le contenu de ma note" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormError message={errMsg} />
          <FormSucces message={successMsg} />
          <Button type="submit" className="bg-green-500 w-full">
            {' '}
            Enregistrer{' '}
          </Button>
        </form>
      </Form>
    </NoteCard>
  )
}

export default NoteForm
