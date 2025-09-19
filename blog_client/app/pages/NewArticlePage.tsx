import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'

import BackButton from '~/components/ui/BackButton'
import Field from '~/components/ui/Field'
import { useUI } from '~/components/ui/store'
import { useCreateArticle } from '~/features/articles/queries'
import { type ArticleCreate, ArticleCreateSchema } from '~/features/articles/schemas'

export default function NewArticlePage() {
  const navigate = useNavigate()
  const createArticle = useCreateArticle()
  const pushToast = useUI((s) => s.pushToast)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ArticleCreate>({
    resolver: zodResolver(ArticleCreateSchema),
  })

  return (
    <>
      <div className="mb-4">
        <BackButton fallback="/" />
      </div>
      <form
        className="space-y-3"
        onSubmit={handleSubmit((data) => {
          createArticle.mutate(data, {
            onSuccess: (article) => {
              pushToast('Статья создана')
              navigate(`/articles/${article.id}`)
            },
            onError: (e) => pushToast((e as Error).message),
          })
        })}
      >
        <h1 className="text-2xl font-bold">Новая статья</h1>
        <Field error={errors.title?.message}>
          <input className="input" placeholder="Заголовок" {...register('title')} />
        </Field>
        <Field error={errors.content?.message}>
          <textarea
            className="textarea"
            rows={10}
            placeholder="Содержание"
            {...register('content')}
          />
        </Field>
        <button disabled={createArticle.isPending} className="btn">
          {createArticle.isPending ? 'Сохранение…' : 'Сохранить'}
        </button>
      </form>
    </>
  )
}
