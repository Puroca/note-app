import { auth, signOut } from '@/auth'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { ChevronDown, User } from 'lucide-react'
import Link from 'next/link'
import SignOutForm from './SignOutForm'

const TopBar = async () => {
  interface NoteItem {
    label: string
    noteHref?: string | any
  }
  const noteItems: NoteItem[] = [
    {
      label: 'Mes notes',
      noteHref: '/notes/mine',
    },

    {
      label: 'Créer',
      noteHref: '/notes/create',
    },
  ]

  const session = await auth()
  const user = session?.user
  return (
    <nav className="bg-[#FF7F00] text-white text-base font-medium py-3  w-full ">
      <ul className="flex items-center justify-between w-[50%] mx-auto ">
        <div className="">
          <li className="bg-white p-2 px-3 rounded-md text-slate-700">
            <Link href={'/'}>NoteApp</Link>
          </li>
        </div>
        <div className="flex items-center gap-8">
          <li className="hover:bg-white hover:rounded-md hover:bg-opacity-50 p-2 hover:text-slate-700">
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none flex items-center">
                Notes{' '}
                <span>
                  {' '}
                  <ChevronDown className="pt-1" width={20} />
                </span>{' '}
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {noteItems.map((note, index) => (
                  <Link key={index} className="w-full" href={note.noteHref}>
                    <DropdownMenuItem className="cursor-pointer">
                      {note.label}
                    </DropdownMenuItem>
                  </Link>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
          <li className="hover:bg-white hover:rounded-md hover:bg-opacity-50 p-2 hover:text-slate-700">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center outline-none">
                Profile
                <span>
                  <ChevronDown className="pt-1" width={20} />
                </span>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {!!user ? (
                  <>
                    <DropdownMenuItem className="flex items-center space-x-3 text-slate-700 cursor-pointer">
                      <User width={15} />
                      <span>{user?.name}</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <SignOutForm />
                    </DropdownMenuItem>
                  </>
                ) : (
                  <>
                    <Link href={'/auth/signup'} className="w-full">
                      <DropdownMenuItem className="cursor-pointer">
                        Inscription
                      </DropdownMenuItem>
                    </Link>
                    <Link href={'/auth/login'} className="w-full">
                      <DropdownMenuItem className="cursor-pointer">
                        Connexion
                      </DropdownMenuItem>
                    </Link>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        </div>
      </ul>
    </nav>
  )
}

export default TopBar
