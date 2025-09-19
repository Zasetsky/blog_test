import { useNavigate } from 'react-router'

export default function BackButton({ fallback = '/' }: { fallback?: string }) {
  const navigate = useNavigate()
  return (
    <button
      type="button"
      className="btn"
      onClick={() => {
        navigate(fallback)
      }}
      aria-label="Назад"
      title="Назад"
    >
      ← Назад
    </button>
  )
}
