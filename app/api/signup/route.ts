import { dbConnect } from '@/lib/dbconnect'
import { User } from '@/models/UserModel'
import bcrypt from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: Request) => {
  const data = await req.json()
  if (data && data.user) {
    const { name, email, password } = data.user
    dbConnect()
    const existingUser = await User.findOne({ email: email })
    if (!existingUser) {
      const hashedPassword = await bcrypt.hash(password, 10)
      const user = new User({
        name,
        email,
        password: hashedPassword,
      })

      const createdUser = await user.save()
      if (!createdUser) {
        return NextResponse.json(
          {
            message: 'Création de compte échouée.',
            success: false,
          },
          { status: 400 }
        )
      }

      return NextResponse.json(
        {
          message: 'Votre compte a été créé avec succès.',
          success: true,
        },
        { status: 201 }
      )
    }
  }

  return NextResponse.json(
    {
      message: 'Création de compte échouée.',
      success: false,
    },
    { status: 400 }
  )
}