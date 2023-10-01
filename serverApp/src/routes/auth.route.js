// Importar el enrutador de Express
import { Router } from "express";
import { login, profile } from "../services/auth.service.js";
import { authenticateJWT } from "../middleware/middleware.js";

// Crear un enrutador para las rutas de autenticación
const authRoutes = Router();

// Definir una ruta POST para el inicio de sesión ("/login")
authRoutes.post("/login", async (req, res) => {
  try {
    // Obtener las credenciales de inicio de sesión (correo electrónico y contraseña) desde el cuerpo de la solicitud
    const { email, password } = req.body;

    // Llamar a la función "login" para autenticar al usuario con las credenciales proporcionadas
    const data = await login(email, password);

    // Devolver una respuesta exitosa con los datos de autenticación
    return res.status(200).json(data);
  } catch (error) {
    // Manejar errores si ocurren durante el proceso de autenticación
    return res.status(500).json({ data: error.message });
  }
});


authRoutes.get("/profile",authenticateJWT, async (req, res) => {
  try {
    // Obtener las credenciales de inicio de sesión (correo electrónico y contraseña) desde el cuerpo de la solicitud
    // Llamar a la función "login" para autenticar al usuario con las credenciales proporcionadas
    const data = await profile(req.user);

    // Devolver una respuesta exitosa con los datos de autenticación
    return res.status(200).json( data );
  } catch (error) {
    // Manejar errores si ocurren durante el proceso de autenticación
    return res.status(500).json({ data: error.message });
  }
});
// Exportar el enrutador de autenticación para su uso en otros archivos
export default authRoutes;
