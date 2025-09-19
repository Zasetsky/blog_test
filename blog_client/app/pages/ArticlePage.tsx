import { useParams } from 'react-router'

import CommentForm from '~/components/comments/CommentForm'
import CommentList from '~/components/comments/CommentList'
import BackButton from '~/components/ui/BackButton'
import { useUI } from '~/components/ui/store'
import { useArticle } from '~/features/articles/queries'
import { useCreateCommentOptimistic } from '~/features/comments/queries'
import { formatDateTime } from '~/shared/formats'

export default function ArticlePage() {
  const id = Number(useParams().id)
  const articleQ = useArticle(id)
  const createComment = useCreateCommentOptimistic(id)
  const pushToast = useUI((s) => s.pushToast)

  if (articleQ.status === 'pending') return <p>Загрузка…</p>
  if (articleQ.status === 'error') return <p>Ошибка: {(articleQ.error as Error).message}</p>

  const a = articleQ.data!
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <BackButton fallback="/" />
      </div>

      <article className="card">
        <h1 className="text-2xl font-bold">{a.title}</h1>
        <div className="muted">{formatDateTime(a.created_at)}</div>
        <div className="mt-4 whitespace-pre-wrap">{a.content}</div>
      </article>

      <section className="card">
        <h2 className="text-xl font-semibold mb-2">Комментарии</h2>
        <CommentList items={a.comments} />
      </section>

      <section className="card">
        <h3 className="text-lg font-semibold mb-2">Добавить комментарий</h3>
        <CommentForm
          onSubmit={(data) =>
            createComment.mutate(data, {
              onError: (e) => pushToast((e as Error).message),
              onSuccess: () => pushToast('Комментарий добавлен'),
            })
          }
          isLoading={createComment.isPending}
        />
      </section>
    </div>
  )
}
