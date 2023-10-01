// Importar el enrutador de Express
import { Router } from "express";

// Importar funciones de servicio relacionadas con usuarios desde "user.service.js"
import {
  createUser,
  findUserById,
  getAllUser,
  updateUser,
  updateUserProfileImage,
} from "../services/user.service.js";

// Importar la configuración de opciones de carga de archivos desde "utils.js"
import { uploadOptions } from "../common/utils.js";

// Importar "express-fileupload" para manejar la carga de archivos
import fileUpload from "express-fileupload";

// Importar middleware de autenticación y autorización desde "middleware.js"
import { authenticateJWT, isAdmin } from "../middleware/middleware.js";

// Crear un enrutador para las rutas de usuarios
const userRoutes = Router();

// Definir una ruta GET para obtener todos los usuarios ("/")
userRoutes.get("/", authenticateJWT, isAdmin, async (req, res) => {
  try {
    // Llamar a la función "getAllUser" para obtener todos los usuarios
    const data = await getAllUser();

    // Verificar si no se encontraron usuarios en la base de datos
    if (!data) return res.status(400).json("Base de datos vacía");

    // Devolver una respuesta exitosa con los datos de todos los usuarios
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
});

// Definir una ruta GET para obtener un usuario por su ID ("/:id")
userRoutes.get("/:id", authenticateJWT, async (req, res) => {
  const { id } = req.params;
  try {
    // Llamar a la función "findUserById" para obtener un usuario por su ID
    const data = await findUserById(id);

    // Verificar si el usuario no se encontró en la base de datos
    if (!data) return res.status(400).json("Base de datos vacía");

    // Devolver una respuesta exitosa con los datos del usuario encontrado
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
});

// Definir una ruta POST para crear un usuario ("/")
userRoutes.post("/", fileUpload(uploadOptions), async (req, res) => {
  const user = req.body;
  const img = req.files?.image; // Obtener la imagen del usuario desde la solicitud

  try {
    // Llamar a la función "createUser" para crear un usuario con la imagen proporcionada
    const data = await createUser(user, img);

    // Devolver una respuesta exitosa con los datos del usuario creado
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
});

// Definir una ruta PUT para actualizar la imagen de perfil de un usuario ("/:userId/profile-image")
userRoutes.put(
  "/change/profile-image",
  authenticateJWT, // Middleware de autenticación JWT
  fileUpload(uploadOptions), // Middleware para cargar archivos con las opciones de carga de archivos
  async (req, res) => {


    console.log(req.files);
    const newImage = req.files?.image; // Obtener la nueva imagen de perfil desde la solicitud

    try {
      // Llamar a la función "updateUserProfileImage" para actualizar la imagen de perfil del usuario con el ID proporcionado
      const updatedUser = await updateUserProfileImage(req.user.id, newImage);

      // Devolver una respuesta exitosa con los datos del usuario actualizado
      return res.status(200).json(updatedUser);
    } catch (error) {
      return res.status(500).json({ data: error.message });
    }
  }
);

// Definir una ruta PUT para actualizar los datos de un usuario por su ID ("/:id")
userRoutes.put("/:id", authenticateJWT, async (req, res) => {
  const { id } = req.params;

  const updatedData = req.body; // Obtener los datos actualizados del usuario desde la solicitud

  try {
    // Llamar a la función "updateUser" para actualizar los datos del usuario por su ID
    const data = await updateUser(id, updatedData);

    // Devolver una respuesta exitosa con los datos del usuario actualizado
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
});

// Definir una ruta DELETE para eliminar un usuario por su ID ("/:id")
userRoutes.delete("/:id", authenticateJWT, isAdmin, async (req, res) => {
  const { id } = req.params;

  try {
    // Llamar a la función "deleteUser" para eliminar un usuario por su ID
    const data = await deleteUser(id);

    // Devolver una respuesta exitosa con los datos del usuario eliminado
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
});


export default userRoutes;

