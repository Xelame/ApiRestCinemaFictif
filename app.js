import { serve } from '@hono/node-server'
import { compress } from 'hono/compress'
import { logger } from 'hono/logger'
import { Hono } from 'hono'

const app = new Hono()

app.use('*', compress())
app.use('*', logger())

app.notFound((c) => {
    return c.text('Custom 404 Message', 404)
})

app.onError((err, c) => {
    console.error(`${err}`)
    return c.text('Custom Error Message', 500)
})

app.get('/', (c) => c.text('Hello Node.js!'))

console.log('Server running at http://localhost:3000/')

serve(app)