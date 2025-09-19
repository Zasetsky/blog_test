import { z } from 'zod'

export const CommentSchema = z.object({
  id: z.number(),
  article_id: z.number(),
  author_name: z.string(),
  content: z.string(),
  created_at: z.string(),
})

export type Comment = z.infer<typeof CommentSchema>

export const CommentCreateSchema = z.object({
  author_name: z.string().min(1, 'Укажите имя'),
  content: z.string().min(1, 'Введите комментарий'),
})

export type CommentCreate = z.infer<typeof CommentCreateSchema>

export const CommentEnvelope = z.object({ data: CommentSchema })
