import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";
import { createCinema, getAllCinema, deleteCinema } from "../controllers/cinema";

const cinema = new Hono();

const prisma = new PrismaClient();

cinema.get("/", getAllCinema);

cinema.post("/:name/:coord", createCinema);

cinema.delete("/:id", deleteCinema);

export default cinema;