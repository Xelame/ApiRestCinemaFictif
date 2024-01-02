import { Hono } from "hono";
import movieRooter from "./routes/movie";
import cinemaRooter from "./routes/cinema";
import { compress } from "hono/compress";
import { bearerAuth } from "hono/bearer-auth";


const app = new Hono();


const token = process.env.SECRET!;

// app.use('*', bearerAuth({ token }))

app.use('*', compress())

app.get("/hello", (c) => c.json({ message: "Hello via Hono!" }))

app.route("/film", movieRooter);

app.route("/cinema", cinemaRooter);

Bun.serve({
    fetch: app.fetch,
    port: process.env.PORT || 3030,
})