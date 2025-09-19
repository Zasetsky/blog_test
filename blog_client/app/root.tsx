import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Links, Outlet, Scripts, ScrollRestoration } from 'react-router'

import type { Route } from './+types/root'
import stylesheet from './app.css?url'
import { Toasts } from './components/ui/Toasts'
import { queryClient } from './lib/queryClient'

export const links: Route.LinksFunction = () => [{ rel: 'stylesheet', href: stylesheet }]

export default function Root() {
  return (
    <html lang="ru">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Блог</title>
        <Links />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          <div className="container">
            <Outlet />
          </div>
          <Toasts />
          <ReactQueryDevtools buttonPosition="bottom-right" />
        </QueryClientProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  )
}
