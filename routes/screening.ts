import { PrismaClient } from "@prisma/client";
import { Hono } from "hono";

const screening = new Hono();

const prisma = new PrismaClient();

// create a screening
screening.post("/:date/:movieId/:cinemaId", (c) => {
    const { date, movieId, cinemaId } = c.req.param();
    prisma.screening.create({
        data: {
            date: date,
            movieId: movieId,
            cinemaId: cinemaId,
        },
    })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
    return c.text(`Screening created !`);
});

// delete a screening outdated
screening.delete("/", (c) => {
    prisma.screening.deleteMany({
        where: {
            date: {
                lt: new Date(),
            },
        },
    })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
    return c.text(`Screening deleted !`);
})

// delete a specific screening by id
screening.delete("/:id", (c) => {
    const { id } = c.req.param();
    prisma.screening.delete({
        where: {
            id: id,
        },
    })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
    return c.text(`Screening deleted !`);
})

// update a screening
screening.put("/:id/:date/:movieId/:cinemaId", (c) => {
    const { id, date, movieId, cinemaId } = c.req.param();
    prisma.screening.update({
        where: {
            id: id,
        },
        data: {
            date: date,
            movieId: movieId,
            cinemaId: cinemaId,
        },
    })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
    return c.text(`Screening updated !`);
});

// get all screenings
screening.get("/", async (c) => {
    return c.json(await prisma.screening.findMany());
});


export default screening;
