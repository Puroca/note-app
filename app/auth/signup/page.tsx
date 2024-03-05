import SignupForm from '@/app/auth/signup/Form'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Signup | NoteApp'
}

const SignupPage = () => {

  return (
    <SignupForm />
  )
}

export default SignupPage
