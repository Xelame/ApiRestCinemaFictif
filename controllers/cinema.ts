import { PrismaClient } from "@prisma/client";
import { getRoute, logger } from "../middlewares/logger";

const prisma = new PrismaClient();

export const createCinema = (c : any) => {
    const route = getRoute(c);
    let { name, coord } = c.req.param();
    prisma.cinema.create({
        data: {
            name: name,
            latitude: parseFloat(coord.split(",")[0]),
            longitude: parseFloat(coord.split(",")[1]),
            
        },
    })
    .then((res) => {
        logger.info(`${route} - ${res}`);
    })
    .catch((err) => {
        logger.error(`${route} - ${err}`);
    });
    return c.text(`Cinema ${name} at ${coord} created`);
}

export const getAllCinema = async (c : any) => {
    const route = getRoute(c);
    const response = await prisma.cinema.findMany().then((res) => {
        logger.info(`${route} - ${res}`);
    })
    .catch((err) => {
        console.log(`${route} - ${err}`);
    });

    return await c.json(response);  
}

export const deleteCinema = (c : any) => {
    const route = getRoute(c);
    const { id } = c.req.param();
    prisma.cinema.delete({
        where: {
            id: id,
        },
    })
        .then((res) => {
            logger.info(`${route} - ${res}`);
        })
        .catch((err) => {
            logger.error(`${route} - ${err}`); 
        });
    return c.text(`Cinema ${id} deleted`);
}