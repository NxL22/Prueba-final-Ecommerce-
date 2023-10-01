// Importar las dependencias necesarias
import Sequelize from "sequelize"; // Importar la biblioteca Sequelize para interactuar con la base de datos
import dotenv from "dotenv"; // Importar la biblioteca dotenv para configurar variables de entorno

dotenv.config(); // Cargar las variables de entorno desde el archivo .env

// Crear una nueva instancia de Sequelize para establecer la conexión con la base de datos
const sequelize = new Sequelize(
  process.env.DB_NAME,         // Nombre de la base de datos desde variables de entorno
  process.env.DB_USERNAME,     // Nombre de usuario de la base de datos desde variables de entorno
  process.env.PASSWORD_PG,     // Contraseña de la base de datos desde variables de entorno
  {
    host: process.env.DB_HOST,     // Host de la base de datos desde variables de entorno
    dialect: process.env.DB_DIALECT || "postgres",  // Tipo de dialecto de la base de datos (predeterminado: PostgreSQL)
    port: process.env.DB_PORT || 5432,  // Puerto de la base de datos (predeterminado: 5432)
    logging: false,  // Desactivar la salida de registros de SQL a la consola
  }
);

export default sequelize; // Exportar la instancia de Sequelize para su uso en otros archivos
