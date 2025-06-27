// Importacion del enrutador de express
import { Router } from "express";

// Importacion de los controladores para las peliculas
import { 
    deleteMovie,
    createMovie,
    updateMovie,
    getAllMovies,
    getMovieByID
} from "../controllers/movie.controllers.js";


export const moviesRoutes = Router();

moviesRoutes.get("/movies", getAllMovies);
moviesRoutes.get("/movies/:id", getMovieByID);
moviesRoutes.post("/movies", createMovie);
moviesRoutes.put("/movies/:id", updateMovie);
moviesRoutes.delete("/movies/:id", deleteMovie);
