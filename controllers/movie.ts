import { PrismaClient } from "@prisma/client";
import { getRoute, logger } from "../middlewares/logger";

const prisma = new PrismaClient();


const urlSrcImg = (path: string) => `https://image.tmdb.org/t/p/original/${path}`;

const urlNowPlaying = `https://api.themoviedb.org/3/movie/now_playing?language=fr&page=1&region=FR`;

const options = (method: string) => {
    return {
        method: method,
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_API_KEY}`
        }
    }
};


export const getfilmDisplayed = async (c: any) => {
    const route = getRoute(c);
    const listOfFilm: any = await (await fetch(urlNowPlaying, options('GET'))).json()
    for (let i = 0; i < listOfFilm.results.length; i++) {
        const movie = listOfFilm.results[i];
        const { id, title, overview, poster_path, backdrop_path } = movie;
        const movieExists = await prisma.movie.findUnique({
            where: {
                idTmdb: id
            }
        });
        if (!movieExists) {
            const response = await prisma.movie.create({
                data: {
                    idTmdb: id,
                    title: title,
                    overview: overview,
                    poster: urlSrcImg(poster_path),
                    backdrop: urlSrcImg(backdrop_path),
                }
            })
            logger.info(`${route} - ${response}`);
        }
    }
    
    return c.json({ message: "Update finished" })
}