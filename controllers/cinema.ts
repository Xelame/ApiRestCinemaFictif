import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createCinema = (c : any) => {
    let { name, coord } = c.req.param();
    prisma.cinema.create({
        data: {
            name: name,
            latitude: parseFloat(coord.split(",")[0]),
            longitude: parseFloat(coord.split(",")[1]),
            
        },
    })
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });
    return c.text(`Cinema ${name} at ${coord} created`);
}

export const getAllCinema = async (c : any) => c.json(await prisma.cinema.findMany())

export const deleteCinema = (c : any) => {
    const { id } = c.req.param();
    prisma.cinema.delete({
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
    return c.text(`Cinema ${id} deleted`);
}