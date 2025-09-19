import { api } from '~/shared/http'

import {
  type Article,
  type ArticleCreate,
  ArticleCreateSchema,
  ArticleEnvelope,
  ArticlesCollectionSchema,
  type ArticleWithComments,
  ArticleWithCommentsEnvelope,
} from './schemas'

export type ArticlesPage = {
  items: Article[]
  current: number
  last: number
  total: number
  perPage: number
  hasPrev: boolean
  hasNext: boolean
}

export async function getArticles(page = 1): Promise<ArticlesPage> {
  const json = await api.get(`articles?page=${page}`).json()
  const parsed = ArticlesCollectionSchema.parse(json)

  const current = parsed.meta?.current_page ?? page
  const last = parsed.meta?.last_page ?? page
  const total = parsed.meta?.total ?? parsed.data.length
  const perPage = parsed.meta?.per_page ?? parsed.data.length

  return {
    items: parsed.data,
    current,
    last,
    total,
    perPage,
    hasPrev: current > 1,
    hasNext: current < last,
  }
}

export async function getArticle(id: number): Promise<ArticleWithComments> {
  const json = await api.get(`articles/${id}`).json()
  return ArticleWithCommentsEnvelope.parse(json).data
}

export async function createArticle(payload: ArticleCreate): Promise<Article> {
  const body = ArticleCreateSchema.parse(payload)
  const res = await api.post('articles', { json: body })
  const text = await res.text()
  const raw = text ? JSON.parse(text) : null
  return ArticleEnvelope.parse(raw).data
}

export async function updateArticle(id: number, patch: Partial<ArticleCreate>): Promise<Article> {
  const res = await api.patch(`articles/${id}`, { json: patch })
  const text = await res.text()
  const raw = text ? JSON.parse(text) : null
  return ArticleEnvelope.parse(raw).data
}

export async function deleteArticle(id: number): Promise<void> {
  await api.delete(`articles/${id}`)
}
