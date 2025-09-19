import type { Comment } from '~/features/comments/schemas'
import { formatDateTime } from '~/shared/formats'

export default function CommentList({ items }: { items: Comment[] }) {
  if (!items?.length) return <p className="muted">Комментариев пока нет.</p>
  
  return (
    <ul className="space-y-3">
      {items.map(c => (
        <li key={c.id} className="card">
          <div className="muted">{c.author_name} • {formatDateTime(c.created_at)}</div>
          <div className="mt-1 whitespace-pre-wrap">{c.content}</div>
        </li>
      ))}
    </ul>
  )
}
