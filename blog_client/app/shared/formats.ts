import { format } from 'date-fns'
import { ru } from 'date-fns/locale'

export const formatDateTime = (s: string) => {
  const d = new Date(s)
  return isNaN(d.getTime()) ? s : format(d, 'd MMMM yyyy, HH:mm', { locale: ru })
}
