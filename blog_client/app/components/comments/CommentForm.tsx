import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import Field from '~/components/ui/Field'
import type { CommentCreate } from '~/features/comments/schemas'
import { CommentCreateSchema } from '~/features/comments/schemas'

export default function CommentForm({ onSubmit, isLoading }:{
  onSubmit: (data: CommentCreate) => void
  isLoading?: boolean
}) {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<CommentCreate>({
    resolver: zodResolver(CommentCreateSchema),
  })
  
  return (
    <form onSubmit={handleSubmit(d => { onSubmit(d); reset() })} className="space-y-3">
      <Field error={errors.author_name?.message}>
        <input className="input" placeholder="Ваше имя" {...register('author_name')} />
      </Field>
      <Field error={errors.content?.message}>
        <textarea className="textarea" rows={4} placeholder="Комментарий" {...register('content')} />
      </Field>
      <button disabled={isLoading} className="btn">{isLoading ? 'Отправка…' : 'Добавить комментарий'}</button>
    </form>
  )
}
