import * as z from 'zod'

export interface UserInterface {
  _id: string
  name: string
  email: string
  password: string
}

export const signUpSchema = z.object({
  name: z.string().min(1, { message: 'Veuillez saisir votre nom' }),

  email: z.string().email({ message: 'Adress Email invalide' }),

  password: z.string().min(1, { message: 'Mot de passe Invalide' }),
})

export const loginSchema = z.object({
  email: z.string().email({ message: 'Adress Email invalide' }),
  password: z.string().min(1, { message: 'Mot de passe Invalide' }),
})

export const NoteSchema = z.object({
  title: z.string().min(1, { message: 'Veuillez saisir le titre votre note' }),
  body: z.string().min(1, { message: 'Veuillez saisir le contenu votre note' }),
  authorId: z.string({
    invalid_type_error: "Non valid"
  }),
})
