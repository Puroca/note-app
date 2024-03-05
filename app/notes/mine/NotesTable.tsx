import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { UserSession } from '../create/Form'
import { fecthNotes } from '@/actions/note'
import { useEffect, useState } from 'react'
import Link from 'next/link'

type NoteType = {
  _id: string
  title: string
  body: string
  authorId: string
}

const NotesTable =  ({ user }: UserSession) => {
  const userId = user?._id
  const [notes, setnotes] = useState<NoteType[]>([])
  const [empty, setempty] = useState<string | null>(null)

  useEffect(() => {
    fecthNotes(userId)
      .then((res: any) => {
        if (!res.success) {
          return setempty(res.message)
        }
        setnotes (res.notes.reverse())
      })
      .catch((err) => {
        setempty("Something went wrong")
      })
  }, [userId])

  if (notes?.length === 0 && !empty) {
    return (
      <div className="text-center text-slate-600 text-xl italic mt-10">
        {' '}
        {`Is Loading...`}{' '}
      </div>
    )
  }

  if (!!empty && notes?.length === 0) {
    return (
      <div className="text-center text-slate-600 text-xl italic mt-10">
        {' '}
        {empty}{' '}
      </div>
    )
  }
  return (
    <Table className="w-[600px] mx-auto">
      <TableHeader className="bg-slate-100">
        <TableRow className="">
          <TableHead>N°</TableHead>
          <TableHead className="text-center">Titres</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {notes &&
          notes.map((note, index) => (
            <TableRow key={index} className="w-full">
              <TableCell>
                {' '}
                <Link href={`/notes/${note._id}`} className="block w-full">
                  {notes.length - index < 10
                    ? `0${notes.length - index}`
                    : notes.length - index}
                </Link>{' '}
              </TableCell>

              <TableCell className="text-center">
                {' '}
                <Link href={`/notes/${note._id}`} className="block w-full ">
                  {note.title}
                </Link>{' '}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}

export default NotesTable
