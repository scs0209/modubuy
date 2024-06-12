import { http } from 'msw'

export const handlers = [
  http.get('/api/users', (req, res, ctx) => {
    return res(ctx.json([{ id: 1, username: 'anson' }]))
  }),
  http.post('/api/auth', (req, res, ctx) => {
    return res(ctx.json({}))
  }),
]
