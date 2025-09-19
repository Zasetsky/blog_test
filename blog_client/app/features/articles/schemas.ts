import { z } from 'zod'

import { CommentSchema } from '../comments/schemas'

export const ArticleSchema = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  created_at: z.string(),
})
export type Article = z.infer<typeof ArticleSchema>

export const CommentedArticleSchema = ArticleSchema.extend({
  comments: z.array(CommentSchema).default([]),
})
export type ArticleWithComments = z.infer<typeof CommentedArticleSchema>

export const PaginationMetaSchema = z
  .object({
    current_page: z.number(),
    last_page: z.number(),
    per_page: z.number(),
    total: z.number(),
  })
  .loose()

export const PaginationLinksSchema = z
  .object({
    first: z.string().nullable().optional(),
    last: z.string().nullable().optional(),
    prev: z.string().nullable().optional(),
    next: z.string().nullable().optional(),
  })
  .loose()

export const ArticlesCollectionSchema = z.object({
  data: z.array(ArticleSchema),
  meta: PaginationMetaSchema.optional(),
  links: PaginationLinksSchema.optional(),
})

export const ArticleCreateSchema = z.object({
  title: z.string().min(1, 'Введите заголовок'),
  content: z.string().min(1, 'Введите содержание'),
})
export type ArticleCreate = z.infer<typeof ArticleCreateSchema>

export const ArticleEnvelope = z.object({ data: ArticleSchema })
export const ArticleWithCommentsEnvelope = z.object({ data: CommentedArticleSchema })
