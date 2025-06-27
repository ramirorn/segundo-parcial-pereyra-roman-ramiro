import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { startDB } from "./src/config/database.js";
import { moviesRoutes } from "./src/routes/movie.routes.js";

const app = express();
const PORT = process.env.PORT;


app.use(express.json());
app.use("/api", moviesRoutes);

app.listen(PORT, async () => {
    await startDB();
    console.log(`SERVIDOR CORRIENDO EN: http://localhost:${PORT}/api`)
})