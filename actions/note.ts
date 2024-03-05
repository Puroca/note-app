import { NoteSchema } from '@/schemas'

import * as z from 'zod'
export const createNote = async (noteProps: z.infer<typeof NoteSchema>) => {
  const validNoteProps = NoteSchema.safeParse(noteProps)
  if (!validNoteProps.success) {
    return { success: false, message: 'Invalid fields.' }
  }
  const { title, body, authorId } = validNoteProps.data
  const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/notes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title,
      body,
      authorId,
    }),
  })
  const responseData = await res.json()

  return responseData
}

export const fecthNotes = async (userId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/notes/user/${userId}`
  )

  const data = await res.json()
  return data
}

export const fetchSingleNote = async (noteId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/notes/${noteId}`
  )
  const data = await res.json()
  return data
}

export const updateSingleNote = async (
  noteId: string,
  values: z.infer<typeof NoteSchema>
) => {
  const validValues = NoteSchema.safeParse(values)
  if (!validValues.success) {
    return { success: false, message: 'Invalid Fields' }
  }
  const { data } = validValues

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/notes/${noteId}`,
    {
      method: 'PUT',
      body: JSON.stringify(data),
    }
  )
  const responseData = res.json()
  return responseData
}

export const deleteSingleNote = async (noteId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/notes/${noteId}`,
    {
      method: 'DELETE',
    }
  )

  const responseData = await res.json()
  return responseData
}
