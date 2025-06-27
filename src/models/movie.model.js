// Importaciones
import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

// Creacion del modelo movies
export const movies = sequelize.define("Movies",
    {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        director:{
            type: DataTypes.STRING,
            allowNull: false
        },
        duration:{
            type: DataTypes.INTEGER,
            allowNull: false
        },
        genre: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING
        }
    }
);

