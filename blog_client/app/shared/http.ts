import ky from 'ky'

export const api = ky.create({
  prefixUrl: '/api',

  headers: { 'Content-Type': 'application/json' },

  hooks: {
    afterResponse: [
      async (_req, _opts, res) => {
        if (!res.ok) {
          let message = `HTTP `
          try {
            const data = await res.clone().json()
            message = (data as any)?.message ?? message
          } catch {}
          throw new Error(message)
        }
      },
    ],
  },
})
