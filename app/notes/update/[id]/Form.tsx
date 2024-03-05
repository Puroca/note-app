'use client'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import NoteCard from '../../create/NoteCard'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { NoteSchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { NoteParamsInterface } from '../../[id]/NoteCard'
import { useEffect, useState } from 'react'
import { fetchSingleNote, updateSingleNote } from '@/actions/note'
import { NoteInterface } from '@/models/NoteModel'
import { FormInput } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import FormError from '@/app/components/FormError'
import FormSucces from '@/app/components/FormSucces'
import { useRouter } from 'next/navigation'
import NoteLoader from '../../NoteLoader'
import { toast } from 'sonner'

const UpdateForm = ({ id }: NoteParamsInterface) => {
  const [note, setnote] = useState<NoteInterface | null>(null)
  const [isEmpty, setIsEmpty] = useState<string | null>(null)
  const [errMsg, setErrMsg] = useState('')
  const [successMsg, setSuccessMsg] = useState('')
  const [submitting, setSubmitting] = useState(false);
  const noteId = id
  const router = useRouter()

  const form = useForm<z.infer<typeof NoteSchema>>({
    resolver: zodResolver(NoteSchema),

    defaultValues: {
      title: '',
      body: '',
      authorId: '',
    },
  })

  useEffect(() => {
    fetchSingleNote(noteId)
      .then((res) => {
        if (!res.success) {
          return setIsEmpty(res.message)
        }
        form.setValue('title', res.note.title)
        form.setValue('body', res.note.body)
        form.setValue('authorId', res.note.authorId)
        return setnote(res.note)
      })
      .catch(() => {
        setIsEmpty('Something went wrong.')
      })
  }, [noteId, form])

  const updateNote = (values: z.infer<typeof NoteSchema>) => {
    setErrMsg('')
    setSuccessMsg('')
    setSubmitting(true)
    updateSingleNote(noteId, values)
      .then((res) => {
        setSubmitting(false)
        if (!res.success) {
          return setErrMsg(res.message)
        }

         setSuccessMsg(res.message)
         toast(`${res.message}`)
         return router.back()
      })
      .catch(() => {
        setSubmitting(false)
        setErrMsg('Something went wrong')
      })
  }

  if (!isEmpty && !note) {
    return (
      <div className="text-xl text-slate-600 italic"> {'Is Loading...'} </div>
    )
  }

  if (!!isEmpty && !note) {
    return <div className="text-xl text-slate-600 italic"> {isEmpty} </div>
  }
  return (
    <NoteCard back title="Modifier une note">
      {submitting && (<NoteLoader message='Modification en cours...' />)}
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(updateNote)}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Titre</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                    placeholder={'Le titre de ma note'}
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
                  <Textarea {...field} placeholder={'Le contenu de ma note'} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormError message={errMsg} />
          <FormSucces message={successMsg} />
          <Button className="bg-green-500 w-full" type="submit">
            Enregistrer
          </Button>
        </form>
      </Form>
    </NoteCard>
  )
}

export default UpdateForm
