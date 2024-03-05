'use client'
import { fetchSingleNote } from '@/actions/note'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

import { NoteInterface } from '@/models/NoteModel'
import { ArrowLeftCircle, Pencil, Trash } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import DeleteBtn from './DeleteBtn'
export interface NoteParamsInterface {
  id: string
}

const NoteCard = ({ id }: NoteParamsInterface) => {
  const noteId = id
  const [note, setnote] = useState<NoteInterface | null>(null)
  const [isEmpty, setIsEmpty] = useState<string | null>(null)
  const router = useRouter()
  useEffect(() => {
    fetchSingleNote(noteId)
      .then((res) => {
        if(!res.success){
          return setIsEmpty(res.message)
        }
        return setnote(res.note)
      })
      .catch(() => {
        setIsEmpty("Something went wrong !")
      })
  }, [noteId])

  if (!isEmpty && !note) {
    return <div className="text-xl text-slate-600 italic"> {"Is Loading..."} </div>
  }

  if (!!isEmpty && !note) {
    return <div className="text-xl text-slate-600 italic"> {isEmpty} </div>
  }
  return (
    <Card className="bg-slate-50 w-[450px]">
      <CardHeader>
        <CardTitle className="flex items-center text-slate-400">
          <button
            className=' hover:text-slate-700'
            type="button"
            onClick={() => {
              router.back()
            }}
          >
            <ArrowLeftCircle size={30} strokeWidth={1} />
          </button>
          <span className="w-full text-center text-slate-700">
            {note?.title}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-6">{note?.body}</CardContent>
      <Separator className="my-4" />
      <CardFooter className="grid grid-cols-2 gap-x-4">
        <Link
          href={`/notes/update/${noteId}`}
          className="w-full block "
        >
          <Button className="flex items-center space-x-3 w-full">
            <Pencil size={20} strokeWidth={1} />
            <span>Modifier</span>
          </Button>
        </Link>
        <DeleteBtn  id={noteId}/>
      </CardFooter>
    </Card>
  )
}

export default NoteCard
