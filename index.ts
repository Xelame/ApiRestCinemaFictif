import { Hono } from "hono";
import movieRooter from "./routes/movie";
import cinemaRooter from "./routes/cinema";
import { compress } from "hono/compress";
import { jwt } from "hono/jwt";

const app = new Hono();

app.use(
    '*',
    (c, next) => {
      const jwtMiddleware = jwt({
        secret: process.env.JWT_SECRET!,
      })
      return jwtMiddleware(c, next)
    }
  )

app.use('*', compress())

app.get("/hello", (c) => c.json({ message: "Hello via Hono!" }))

app.route("/film", movieRooter);

app.route("/cinema", cinemaRooter);

Bun.serve({
    fetch: app.fetch,
    port: process.env.PORT || 3030,
})