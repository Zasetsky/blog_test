import { Link } from 'react-router'

export default function Pagination({
  current,
  last,
  basePath = '/',
}: {
  current: number
  last: number
  basePath?: string
}) {
  if (last <= 1) return null

  const href = (p: number) => (p <= 1 ? basePath : `${basePath}?page=${p}`)

  return (
    <nav className="mt-6 flex items-center gap-2">
      <Link className="btn" aria-disabled={current <= 1} to={href(Math.max(1, current - 1))}>
        ← Назад
      </Link>
      <span className="muted">
        Стр. {current} из {last}
      </span>
      <Link className="btn" aria-disabled={current >= last} to={href(Math.min(last, current + 1))}>
        Вперёд →
      </Link>
    </nav>
  )
}
