import { Schema, model, models } from 'mongoose'

export interface NoteInterface {
  title: string
  body: string
  authorId: string
}

const noteSchema = new Schema<NoteInterface>({
  title: { type: String, required: true },
  body: { type: String, required: true },
  authorId: String,
})

export const NoteModel = models.Note || model<NoteInterface>('Note', noteSchema)
