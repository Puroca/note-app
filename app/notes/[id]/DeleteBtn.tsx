import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { Trash } from 'lucide-react'
import { useState } from 'react'
import NoteLoader from '../NoteLoader'
import { deleteSingleNote } from '@/actions/note'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

interface props {
  id: string
}

const DeleteBtn = ({ id }: props) => {
  const [isDeleting, setisDeleting] = useState(false)
  const noteId = id
  const router = useRouter()

  const deleteNote = async () => {
    setisDeleting(true)
    deleteSingleNote(noteId)
    .then((res) => {
      if(!res.success){
        return setisDeleting(false)
      }
      toast(`${res.message}`)
      return router.back()
    }).catch(() => {
      setisDeleting(false)
    })
  }
  return (
    <AlertDialog>
      {isDeleting && <NoteLoader message="Supression en cours..." />}
      <AlertDialogTrigger asChild>
        <Button className="flex items-center space-x-3 bg-red-500">
          <Trash size={20} strokeWidth={1} />
          <span>Supprimer</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {'Êtes-vous sûre de vouloir supprimer cette note ?'}{' '}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {'Cette action de suppression de note est irréversible.'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="">
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={deleteNote} className="bg-red-500">
            Supprimer
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteBtn
