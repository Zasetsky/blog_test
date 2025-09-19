import { create } from 'zustand'

type Toast = { id: string; message: string }
type UIState = {
  toasts: Toast[]
  pushToast: (message: string) => void
  removeToast: (id: string) => void
}
export const useUI = create<UIState>((set) => ({
  toasts: [],
  pushToast: (message) =>
    set((s) => ({ toasts: [...s.toasts, { id: crypto.randomUUID(), message }] })),
  removeToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
}))
