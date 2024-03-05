'use server'
import { auth } from '@/auth'
import { dbConnect } from '@/lib/dbconnect'
import { NoteModel } from '@/models/NoteModel'
import { NoteSchema } from '@/schemas'
import { NextResponse } from 'next/server'

export const POST = async (req: Request) => {
  const session = await auth()

  if (!session || !session.user) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized.' },
      { status: 401 }
    )
  }

  const data = await req.json()
  const validNote = NoteSchema.safeParse(data)

  if (!validNote.success) {
    return NextResponse.json(
      { success: false, message: 'Invalid fileds.' },
      { status: 400 }
    )
  }
  const { title, body, authorId } = validNote.data

  const note = new NoteModel({
    title: title,
    body: body,
    authorId: authorId,
  })
  dbConnect()
  const savedNote = await note.save()

  if (!savedNote) {
    return NextResponse.json(
      { success: false, message: 'Enregistrement échouée.' },
      { status: 400 }
    )
  }
  
  return NextResponse.json({success: true, message:"Note créée avec succès."},{status: 201})
}
