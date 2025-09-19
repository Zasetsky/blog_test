import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  type ArticlesPage,
  createArticle,
  deleteArticle,
  getArticle,
  getArticles,
  updateArticle,
} from './api'
import type { ArticleCreate, ArticleWithComments } from './schemas'

export const qk = {
  articles: ['articles'] as const,
  page: (p: number) => ['articles', 'page', p] as const,
  article: (id: number) => ['articles', id] as const,
}

export function useArticles(page = 1) {
  return useQuery<ArticlesPage>({ queryKey: qk.page(page), queryFn: () => getArticles(page) })
}

export function useArticle(id: number) {
  return useQuery<ArticleWithComments>({ queryKey: qk.article(id), queryFn: () => getArticle(id) })
}

export function useCreateArticle() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (p: ArticleCreate) => createArticle(p),
    onSuccess: (created) => {
      qc.invalidateQueries({ queryKey: qk.articles })
      qc.setQueryData(qk.article(created.id), { ...created, comments: [] } as ArticleWithComments)
    },
  })
}

export function useUpdateArticle(id: number) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (p: Partial<ArticleCreate>) => updateArticle(id, p),
    onSuccess: (updated) => {
      qc.invalidateQueries({ queryKey: qk.articles })
      qc.setQueryData(qk.article(id), (prev: any) => ({
        ...updated,
        comments: prev?.comments ?? [],
      }))
    },
  })
}

export function useDeleteArticle(id: number) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: () => deleteArticle(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: qk.articles })
      qc.removeQueries({ queryKey: qk.article(id) })
    },
  })
}
