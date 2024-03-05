import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ArrowLeftCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

interface NoteCardProps {
  children: React.ReactNode
  title: string
  footer?: string
  back: boolean
}
const NoteCard = ({ children, title, footer, back }: NoteCardProps) => {
  const router = useRouter()
  return (
    <Card className="w-[400px] text-slate-700">
      <CardHeader>
        {back ? (
          <div className="flex items-center text-slate-400 ">
            <button  onClick={() =>{router.back()}} className='hover:text-slate-700' >
              <ArrowLeftCircle size={30} strokeWidth={1} />
            </button>
            <CardTitle className="text-2xl text-slate-700 text-center w-full">
              {' '}
              {title}{' '}
            </CardTitle>
          </div>
        ) : (
          <CardTitle className="text-2xl text-center w-full">
            {' '}
            {title}{' '}
          </CardTitle>
        )}
      </CardHeader>
      <CardContent className="text-slate-600">{children}</CardContent>
      <CardFooter>{footer}</CardFooter>
    </Card>
  )
}

export default NoteCard
