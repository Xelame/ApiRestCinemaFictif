import { Hono } from "hono";
import { getfilmDisplayed } from "../controllers/movie";

const movie = new Hono();

movie.post("/", getfilmDisplayed)

export default movie;