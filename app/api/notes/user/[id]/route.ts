import { auth } from '@/auth'
import { dbConnect } from '@/lib/dbconnect'
import { NoteModel } from '@/models/NoteModel'
import { NextResponse } from 'next/server'

export const GET = async ( 
  req: Request ,
  { params }: { params: { id: string } }
) => {
  const session = await auth()
  
  if(!session || !session.user){
    return NextResponse.json({succes: false}, {status:401})
  }
  
  const userId = params?.id
  dbConnect()
  const notes = await NoteModel.find({ authorId: userId })
  if(notes.length === 0){
    return NextResponse.json({ success: false, message: "Vous n'avez aucune note pour l'instant" }, { status: 404 })
  }
  return NextResponse.json({ success: true, notes:notes }, { status: 200 })
}


