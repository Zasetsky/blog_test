import { index, route,type RouteConfig } from '@react-router/dev/routes'

export default [
  index('routes/_index.tsx'),
  route('articles/new', 'routes/articles.new.tsx'),
  route('articles/:id', 'routes/articles.$id.tsx'),
] satisfies RouteConfig