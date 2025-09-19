import { Link } from 'react-router'

import type { Article } from '~/features/articles/schemas'
import { formatDateTime } from '~/shared/formats'

export default function ArticleCard({ article }: { article: Article }) {
  const excerpt = article.content.length > 160 ? article.content.slice(0,160) + '…' : article.content
  return (
    <article className="card">
      <h2 className="text-xl font-semibold">
        <Link to={`/articles/${article.id}`} className="hover:underline">
          {article.title}
        </Link>
      </h2>
      <div className="muted">{formatDateTime(article.created_at)}</div>
      <p className="mt-2">{excerpt}</p>
    </article>
  )
}
