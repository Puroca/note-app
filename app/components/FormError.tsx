import { AlertTriangle } from 'lucide-react'
interface ErrorProps {
  message?: string
}

const FormError = ({ message }: ErrorProps) => {
  if (!message) return null

  return (
    <div className="w-full text-red-500 bg-white py-2 px-3 rounded-md flex items-center gap-x-4">
      <AlertTriangle width={30} />
      <span>{message}</span>
    </div>
  )
}

export default FormError
