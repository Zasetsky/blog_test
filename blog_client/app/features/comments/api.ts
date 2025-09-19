import {
  type CommentCreate,
  CommentCreateSchema,
  CommentEnvelope,
} from '~/features/comments/schemas'
import { api } from '~/shared/http'

export async function createComment(articleId: number, payload: CommentCreate) {
  const data = CommentCreateSchema.parse(payload)

  const res = await api.post(`articles/${articleId}/comments`, { json: data })
  const text = await res.text()
  const raw = text ? JSON.parse(text) : null

  return CommentEnvelope.parse(raw).data
}
