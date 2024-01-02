import { Hono } from "hono";
import { createCinema, getAllCinema, deleteCinema } from "../controllers/cinema";

const cinema = new Hono();


cinema.get("/", getAllCinema);

cinema.post("/:name/:coord", createCinema);

cinema.delete("/:id", deleteCinema);

export default cinema;