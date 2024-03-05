import { auth } from '@/auth'
import { dbConnect } from '@/lib/dbconnect'
import { NoteModel } from '@/models/NoteModel'
import { NextResponse } from 'next/server'

export const GET = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const session = await auth()
  const noteId = params?.id
  if (!session || !session.user) {
    return NextResponse.json({ success: false }, { status: 401 })
  }
  dbConnect()
  const note = await NoteModel.findOne({ _id: noteId })
  if (!note) {
    return NextResponse.json(
      { success: false, message: "Cette note n'existe pas." },
      { status: 404 }
    )
  }
  return NextResponse.json({ success: true, note }, { status: 200 })
}

export const PUT = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const session = await auth()

  if (!session || !session.user) {
    return NextResponse.json({ success: false }, { status: 401 })
  }
  const noteId = params.id

  const body = await req.json()
  dbConnect()
  const updatedNote = await NoteModel.updateOne({ _id: noteId }, body)

  if (!updatedNote) {
    return NextResponse.json(
      { success: false, message: 'Modification échouée.' },
      { status: 400 }
    )
  }

  return NextResponse.json(
    { success: true, message: 'Note modiffiée avec succès.' },
    { status: 200 }
  )
}

export const DELETE = async (
  req: Request,
  { params }: { params: { id: string } }
) => {
  const session = await auth()
  if (!session || !session.user) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized.' },
      { status: 401 }
    )
  }

  const noteId = params.id

  dbConnect()
  const deletedNote = await NoteModel.deleteOne({ _id: noteId })

  if (!deletedNote) {
    return NextResponse.json(
      { success: false, message: 'Supression échouée.' },
      { status: 400 }
    )
  }

  return NextResponse.json(
    { success: true, message: 'Note supprimée avec succès.' },
    { status: 200 }
  )
}
