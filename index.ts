import { Hono } from "hono";
import { logger } from "hono/logger";
import movieRooter from "./routes/movie";
import cinemaRooter from "./routes/cinema";

const app = new Hono();

app.use ('*', logger());


app.get("/hello", (c) => c.json({ message: "Hello via Hono!" }))

app.route("/film", movieRooter);

app.route("/cinema", cinemaRooter);

Bun.serve({
    fetch: app.fetch,
    port: process.env.PORT || 3030,
})