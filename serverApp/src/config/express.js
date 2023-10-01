// Importar las dependencias necesarias
import express from "express"; // Importar la biblioteca Express para crear la aplicación web
import morgan from "morgan"; // Importar la biblioteca morgan para el registro de solicitudes HTTP
import cors from "cors"; // Importar la biblioteca cors para habilitar la gestión de solicitudes cruzadas (CORS)
import cookieParser from "cookie-parser"; // Importar la biblioteca cookie-parser para analizar las cookies
import { config } from "dotenv"; // Importar la biblioteca dotenv para configurar variables de entorno
import productRoutes from "../routes/product.route.js"; // Importar las rutas relacionadas con productos desde un archivo separado
import userRoutes from "../routes/user.route.js"; // Importar las rutas relacionadas con usuarios desde un archivo separado
import authRoutes from "../routes/auth.route.js"; // Importar las rutas relacionadas con autenticación desde un archivo separado

config(); // Cargar las variables de entorno desde el archivo .env

const expressApp = express(); // Crear una instancia de la aplicación Express

// Configuración de middleware y opciones CORS
expressApp.use(
  cors({
    origin: "*", // Permitir solicitudes desde cualquier origen (esto puede ser ajustado según las necesidades)
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "reset",
      "pos",
      "confirm",
    ], // Encabezados permitidos en las solicitudes CORS
    methods: ["GET", "PUT", "POST", "DELETE"], // Métodos HTTP permitidos en las solicitudes CORS
  })
);

expressApp.use(express.json()); // Habilitar el análisis de datos JSON en las solicitudes
expressApp.use(express.urlencoded({ extended: true })); // Habilitar el análisis de datos codificados en la URL en las solicitudes
expressApp.use(cookieParser()); // Habilitar el análisis de cookies en las solicitudes

expressApp.use(morgan("dev")); // Configurar el registro de solicitudes HTTP en modo "dev"

// Definir las rutas para cada recurso
expressApp.use('/product', productRoutes); // Rutas relacionadas con productos
expressApp.use('/user', userRoutes); // Rutas relacionadas con usuarios
expressApp.use('/auth', authRoutes); // Rutas relacionadas con autenticación

expressApp.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "*");
  next();
});

export default expressApp; // Exportar la instancia de la aplicación Express para ser utilizada en otros archivos
