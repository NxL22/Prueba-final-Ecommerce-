// Importar el enrutador de Express
import { Router } from "express";

// Importar funciones de servicio relacionadas con productos desde "product.service.js"
import {
  addImagesToProduct,
  createProduct,
  deleteProduct,
  deleteProductImage,
  getAllProducts,
  getProduct,
} from "../services/product.service.js";

// Importar "express-fileupload" para manejar la carga de archivos
import fileUpload from "express-fileupload";

// Importar la configuración de opciones de carga de archivos desde "utils.js"
import { uploadOptions } from "../common/utils.js";

// Importar middleware de autenticación y autorización desde "middleware.js"
import { authenticateJWT, isAdmin } from "../middleware/middleware.js";


// Crear un enrutador para las rutas de productos
const productRoutes = Router();

// Definir una ruta POST para crear un producto ("/")
productRoutes.post(
  "/",
  authenticateJWT, // Middleware de autenticación JWT
  isAdmin, // Middleware de autorización para administradores
  fileUpload(uploadOptions), // Middleware para cargar archivos con las opciones de carga de archivos
  async (req, res) => {
    const product = req.body;
    const image = req.files?.image; // Obtener la imagen del producto desde la solicitud

    try {
      // Llamar a la función "createProduct" para crear un producto con la imagen proporcionada
      const data = await createProduct(product, image);

      // Devolver una respuesta exitosa con los datos del producto creado
      return res.status(201).json(data);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Error interno del servidor.", details: error.message });
    }
  }
);

// Definir una ruta POST para agregar imágenes a un producto ("/:productId/images")
productRoutes.post(
  "/:productId/images",
  authenticateJWT, // Middleware de autenticación JWT
  isAdmin, // Middleware de autorización para administradores
  fileUpload(uploadOptions), // Middleware para cargar archivos con las opciones de carga de archivos
  async (req, res) => {
    const productId = req.params.productId;
    const imageFiles = req.files?.images; // Obtener las imágenes del producto desde la solicitud (asegúrate de que el nombre del campo coincida con lo que esperas)

    try {
      // Llamar a la función "addImagesToProduct" para agregar imágenes al producto con el ID proporcionado
      const updatedProduct = await addImagesToProduct(productId, imageFiles);

      // Devolver una respuesta exitosa con los datos del producto actualizado
      return res.status(200).json(updatedProduct);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Error interno del servidor", details: error.message });
    }
  }
);

// Definir una ruta GET para obtener todos los productos ("/")
productRoutes.get("/", async (req, res) => {
  try {
    // Llamar a la función "getAllProducts" para obtener todos los productos
    const data = await getAllProducts();

    // Verificar si no se encontraron productos en la base de datos
    if (!data) return res.status(400).json("Base de datos vacía");

    // Devolver una respuesta exitosa con los datos de todos los productos
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
});

// Definir una ruta GET para obtener un producto por su ID ("/:id")
productRoutes.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    // Llamar a la función "getProduct" para obtener un producto por su ID
    const data = await getProduct(id);

    // Verificar si el producto no se encontró en la base de datos
    if (!data) return res.status(400).json("Base de datos vacía");

    // Devolver una respuesta exitosa con los datos del producto encontrado
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ data: error.message });
  }
});

// Definir una ruta DELETE para eliminar una imagen de un producto ("/:productId/images/:imageId")
productRoutes.delete(
  "/:productId/images/:imageId",
  authenticateJWT, // Middleware de autenticación JWT
  isAdmin, // Middleware de autorización para administradores
  async (req, res) => {
    const { productId, imageId } = req.params;

    try {
      // Llamar a la función "deleteProductImage" para eliminar una imagen de un producto
      const result = await deleteProductImage(productId, imageId);

      // Devolver una respuesta exitosa con un mensaje de éxito
      return res.status(200).json({ message: result });
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Error interno del servidor.", details: error.message });
    }
  }
);

// Definir una ruta DELETE para eliminar un producto por su ID ("/:id")
productRoutes.delete(
  "/:id",
  authenticateJWT, // Middleware de autenticación JWT
  isAdmin, // Middleware de autorización para administradores
  async (req, res) => {
    const { id } = req.params;
    try {
      // Llamar a la función "deleteProduct" para eliminar un producto por su ID
      const data = await deleteProduct(id);

      // Verificar si el producto no se encontró en la base de datos
      if (!data) return res.status(400).json("Producto no encontrado");

      // Devolver una respuesta exitosa con los datos del producto eliminado
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ data: error.message });
    }
  }
);

export default productRoutes;

