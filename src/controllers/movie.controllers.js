// Importacion del modelo Movies
import { Movies } from "../models/movie.model.js";

// Funcion para obtener todas las peliculas
export const getAllMovies = async (req, res) => {
    try {
        const movies = await Movies.findAll();
    } catch (err) {
        res.status(500).json({errormessage: err.message});
    }
};

// Funcion para obtener una pelicula por ID
export const getMovieByID = async (req, res) => {
    try {
        const movie = await Movies.findByPk({where: {id: req.params.id}});
    } catch (err) {
        res.status(500).json({errormessage: err.message});
    }
    
};

// Funcion para crear una pelicula
export const createMovie = async (req, res) => {
    try {
        const movie = await Movies.create();
    } catch (err) {
        res.status(500).json({errormessage: err.message});
    }
    
};

// Funcion para actualizar una pelicula
export const updateMovie = async (req, res) => {
    try {
        const [updated] = await Movies.update({where: {id: req.params.id}});
    } catch (err) {
        res.status(500).json({errormessage: err.message});
    }
    
};

// Funcion para borrar una pelicula
export const deleteMovie = async (req, res) => {
    try {
        const deleted = await Movies.destroy({where: {id: req.params.id}});
    } catch (err) {
        res.status(500).json({errormessage: err.message});
    }
};