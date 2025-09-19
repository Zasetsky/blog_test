import { useUI } from './store'

export function Toasts() {
  const { toasts, removeToast } = useUI()
  return (
    <div className="fixed bottom-4 right-4 space-y-2 z-50">
      {toasts.map(t => (
        <div key={t.id} className="card bg-neutral-900 text-white shadow-lg">
          <div className="flex items-center gap-3">
            <div className="grow">{t.message}</div>
            <button className="btn" onClick={() => removeToast(t.id)}>✕</button>
          </div>
        </div>
      ))}
    </div>
  )
}
