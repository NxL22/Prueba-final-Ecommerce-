// Importar las dependencias necesarias
import dotenv from "dotenv"; // Importar la biblioteca dotenv para configurar variables de entorno
import bcrypt from "bcrypt"; // Importar la biblioteca bcrypt para el cifrado de contraseñas
import USER from "../database/user.entity.js"; // Importar el modelo de usuario desde el archivo user.entity.js

dotenv.config(); // Cargar las variables de entorno desde el archivo .env

// Función asincrónica para crear un administrador si no existe
async function createAdminIfNotExists() {
  try {
    // Verificar si ya existe un administrador en la base de datos
    const adminExists = await USER.findOne({ where: { isAdmin: true } });

    // Si no existe un administrador, crearlo
    if (!adminExists) {
      // Crear un nuevo usuario con los siguientes datos:
      await USER.create({
        isAdmin: true, // Establecer como administrador
        fullname: process.env.ADMIN_FULLNAME, // Nombre completo desde variables de entorno
        email: process.env.ADMIN_EMAIL, // Correo electrónico desde variables de entorno
        password: await bcrypt.hash(process.env.ADMIN_PASSWORD, 10), // Cifrar la contraseña desde variables de entorno
        status: "active", // Establecer el estado como "activo"
      });

      console.log("Administrador creado exitosamente.");
    } else {
      console.log("El administrador ya existe en la base de datos.");
    }
  } catch (error) {
    console.error("Error al crear el administrador:", error); // Manejar errores en caso de que ocurran
  }
}

export default createAdminIfNotExists; // Exportar la función para su uso en otros archivos

