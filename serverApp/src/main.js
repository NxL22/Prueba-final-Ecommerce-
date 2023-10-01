import { config } from "dotenv";
import httpServer from "./config/http.js";
import sequelize from "./config/db.js";
import createAdminIfNotExists from "./config/admin.js";

config(); // Cargar las variables de entorno desde el archivo .env

// Función asincrónica para inicializar la aplicación
async function bootstrap() {
    try {
        // Sincronizar el modelo de datos con la base de datos (opcionalmente forzando la creación de tablas si se establece "force" en true)
        await sequelize.sync({ force: true });

        // Llamar a la función createAdminIfNotExists para crear un administrador si no existe
        await createAdminIfNotExists();

        // Iniciar el servidor HTTP y escuchar en el puerto especificado en las variables de entorno
        httpServer.listen(process.env.PORT, () => {
            console.log(`Servidor escuchando en el puerto ${process.env.PORT}`);
        });
    } catch (error) {
        // Manejar errores si ocurren durante la inicialización
        console.error('Error al iniciar el servidor:', error);
    }
}


// Llamamos a la función bootstrap para iniciar el servidor
bootstrap();