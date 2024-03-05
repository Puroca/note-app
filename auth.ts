import bcrypt from 'bcryptjs'
import CredentialsProvider from 'next-auth/providers/credentials'
import { loginSchema } from './schemas'
import NextAuth, { NextAuthConfig } from 'next-auth'
import { dbConnect } from './lib/dbconnect'
import { User } from '@/models/UserModel'


export const authConfig = {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const validValues = loginSchema.safeParse(credentials)
        if (validValues.success) {
          const { email, password } = validValues.data
          dbConnect()
          const userExist = await User.findOne({ email: email })

          if (!userExist || !userExist.password) return null

          const passwordMatch = await bcrypt.compare(
            password,
            userExist.password
          )

          if (!passwordMatch) return null

          const user = {
            _id: userExist._id,
            name: userExist.name,
            email: userExist.email,
          }

          return user
        }
        return null
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any ) {
      if(user){
        token._id = user._id 
        token.name = user.name
        token.email = user.email
      }
      return token
    },

    async session({token, session}:any){
      session.user._id = token._id
      session.token = token
      return session
    }
  },

  pages: {
    signIn: '/auth/login'
  },

  session: { strategy: 'jwt' },
} satisfies NextAuthConfig

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(authConfig)
