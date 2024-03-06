import { signOut } from '@/auth'
import { DEFAULT_SIGNOUT_REDIRECT } from '@/routes'

const SignOutForm = () => {
  return (
    <form
      className="w-full"
      action={async () => {
        'use server'
        try {
          await signOut({
            redirect: true,
            redirectTo: DEFAULT_SIGNOUT_REDIRECT,
          })
        } catch(err) {
          
        } finally {
          await signOut({ redirectTo: DEFAULT_SIGNOUT_REDIRECT })
        }
      }}
    >
      <button className="w-full text-start" type="submit">
        Déconnexion
      </button>
    </form>
  )
}

export default SignOutForm
