import { Link, useSearchParams } from 'react-router'

import ArticleCard from '~/components/articles/ArticleCard'
import Pagination from '~/components/ui/Pagination'
import { useArticles } from '~/features/articles/queries'

export default function ArticlesListPage() {
  const [params] = useSearchParams()
  const page = Math.max(1, Number(params.get('page') || 1))

  const { data, status, error } = useArticles(page)
  if (status === 'pending') return <p>Загрузка…</p>
  if (status === 'error') return <p>Ошибка: {(error as Error).message}</p>

  return (
    <>
      <header className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Блог</h1>
        <Link to="/articles/new" className="btn">
          Новая статья
        </Link>
      </header>

      <div className="space-y-4">
        {data!.items.map((a) => (
          <ArticleCard key={a.id} article={a} />
        ))}
      </div>

      {data!.last > 1 && <Pagination current={data!.current} last={data!.last} basePath="/" />}
    </>
  )
}
