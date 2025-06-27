// Importacion del modelo Movies
import { INTEGER } from "sequelize";
import { Movies } from "../models/movie.model.js";

// Funcion para obtener todas las peliculas
export const getAllMovies = async (req, res) => {
    try {
        const movies = await Movies.findAll();
        res.json(movies);
    } catch (err) {
        res.status(500).json({errormessage: err.message});
    }
};

// Funcion para obtener una pelicula por ID
export const getMovieByID = async (req, res) => {
    try {
        const movie = await Movies.findByPk(req.params.id);
        res.json(movie);
    } catch (err) {
        console.log(err);
        res.status(500).json({errormessage: err.message});
    }
    
};

// Funcion para crear una pelicula
export const createMovie = async (req, res) => {
    const {title, director, duration, genre, description} = req.body;
    if (req.body) {
        for (let value in req.body) {
            if (typeof req.body[value] === "string") req.body[value] = req.body[value].trim();
        }
    }
    try {
        // Validaciones para que los datos sean incluidos y no esten vacios
        if (title === undefined || title === "") return res.status(400).json({message: "El titulo de la pelicula debe ser incluido y no debe estar vacio"});
        if (director === undefined || director === "") return res.status(400).json({message: "El director de la pelicula debe ser incluido y no debe estar vacio"});
        if (duration === undefined || duration === "") return res.status(400).json({message: "La duracion de la pelicula debe ser incluida y no debe estar vacia"});
        if (genre === undefined || genre === "") return res.status(400).json({message: "El genero de la pelicula debe ser incluido y no debe estar vacio"});
        if (description) {
            if (description === "") return res.status(400).json({message: "La descripcion de la pelicula no puede estar vacia"});
        }

        // Validacion de titulo unico
        const titleUnique = await Movies.findOne({where: {title}});
        if (titleUnique) return res.status(400).json({message: "El nombre del personaje ya existe"});

        const durationInt = Number.isInteger(duration);
        if (duration !== durationInt && duration <= 0) return res.status(400).json({message: "La duracion de la pelicula debe ser un numero entero positivo"});

        const movie = await Movies.create({title, director, duration, genre, description});
        res.status(200).json({message:"Pelicula creada exitosamente"});
        res.json(movie);
    } catch (err) {
        res.status(500).json({errormessage: err.message});
    }
    
};

// Funcion para actualizar una pelicula
export const updateMovie = async (req, res) => {
    const {title, director, duration, genre, description} = req.body;
    try {
        // Validaciones para que los datos sean incluidos y no esten vacios
        if (title) { if (title === undefined || title === "") return res.status(400).json({message: "El titulo de la pelicula debe ser incluido y no debe estar vacio"});};
        if (director) { if (director === undefined || director === "") return res.status(400).json({message: "El director de la pelicula debe ser incluido y no debe estar vacio"});};
        if (duration) {if (duration === undefined || duration === "") return res.status(400).json({message: "La duracion de la pelicula debe ser incluida y no debe estar vacia"});};
        if (genre) { if (genre === undefined || genre === "") return res.status(400).json({message: "El genero de la pelicula debe ser incluido y no debe estar vacio"});};
        if (description) {
            if (description === "") return res.status(400).json({message: "La descripcion de la pelicula no puede estar vacia"});
        }

        // Validacion de titulo unico
        const titleUnique = await Movies.findOne({where: {title}});
        if (titleUnique) return res.status(400).json({message: "El nombre del personaje ya existe"});

        // Validacion duracion entera y positiva
        const durationInt = Number.isInteger(duration);
        if (duration !== durationInt && duration < 1) return res.status(400).json({message: "La duracion de la pelicula debe ser un numero entero positivo"});

        const [updated] = await Movies.update({title, director, duration, genre, description},{where: {id: req.params.id}});
        if (updated > 0) return res.status(200).json({message:"El personaje fue actualizado exitosamente"})
        res.status(404).json({message: "El personaje no existe"})
    } catch (err) {
        res.status(500).json({errormessage: err.message});
    }
    
};

// Funcion para borrar una pelicula
export const deleteMovie = async (req, res) => {
    try {
        const deleted = await Movies.destroy({where: {id: req.params.id}});
        if (deleted) { return res.status(200).json("Personaje borrado con exito")
        } else {
            return res.status(404).json({message: "No se encontro el personaje"})
        }
    } catch (err) {
        res.status(500).json({errormessage: err.message});
    }
};