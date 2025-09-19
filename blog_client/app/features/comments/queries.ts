import { useMutation, useQueryClient } from '@tanstack/react-query'

import { qk } from '../articles/queries'
import type { ArticleWithComments } from '../articles/schemas'
import { createComment } from './api'
import type { CommentCreate } from './schemas'

export function useCreateCommentOptimistic(articleId: number) {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (p: CommentCreate) => createComment(articleId, p),

    onMutate: async (p) => {
      await qc.cancelQueries({ queryKey: qk.article(articleId) })
      const prev = qc.getQueryData<ArticleWithComments>(qk.article(articleId))

      if (prev) {
        const optimistic = {
          id: Number.MAX_SAFE_INTEGER - Math.floor(Math.random() * 1e6),
          article_id: articleId,
          author_name: p.author_name,
          content: p.content,
          created_at: new Date().toISOString(),
        }

        qc.setQueryData<ArticleWithComments>(qk.article(articleId), {
          ...prev,
          comments: [optimistic, ...prev.comments],
        })
      }

      return { prev }
    },

    onError: (_e, _v, ctx) => {
      if (ctx?.prev) qc.setQueryData(qk.article(articleId), ctx.prev)
    },

    onSettled: () => {
      qc.invalidateQueries({ queryKey: qk.article(articleId) })
    },
  })
}
