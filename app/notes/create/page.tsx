import { Metadata } from 'next'
import NoteForm from './Form'
import { auth } from '@/auth'

export const metadata: Metadata = {
  title: 'Créer une note | NoteApp',
}
const page = async () => {
    const session = await auth()
    const user = session?.user
  return <NoteForm user={user} />
}

export default page
