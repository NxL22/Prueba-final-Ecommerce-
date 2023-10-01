// Importar las dependencias necesarias
import { v2 as cloudinary } from "cloudinary"; // Importar la biblioteca Cloudinary para gestionar imágenes
import { config } from "dotenv"; // Importar la biblioteca dotenv para configurar variables de entorno
import fs from "fs-extra"; // Importar la biblioteca fs-extra para trabajar con archivos
config(); // Cargar las variables de entorno desde el archivo .env

// Configurar la conexión con Cloudinary utilizando las variables de entorno
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, // Nombre de la nube de Cloudinary desde variables de entorno
  api_key: process.env.CLOUDINARY_API_KEY, // Clave de API de Cloudinary desde variables de entorno
  api_secret: process.env.CLOUDINARY_API_SECRET, // Clave secreta de API de Cloudinary desde variables de entorno
  secure: false, // No usar conexión segura (puede variar dependiendo de la configuración)
});

// Función asincrónica para cargar una imagen de producto a Cloudinary
export async function uploadImageProduct(file) {
  const result = await cloudinary.uploader.upload(file.tempFilePath, {
    folder: "coder/products", // Carpeta donde se almacenará la imagen en Cloudinary
  });
  await fs.unlink(file.tempFilePath); // Eliminar el archivo temporal después de cargarlo a Cloudinary
  return result; // Devolver el resultado de la carga de la imagen en Cloudinary
}

// Función asincrónica para cargar una imagen de perfil a Cloudinary
export async function uploadImageProfile(file) {
  const result = await cloudinary.uploader.upload(file.tempFilePath, {
    folder: "coder/profile", // Carpeta donde se almacenará la imagen en Cloudinary
  });
  await fs.unlink(file.tempFilePath); // Eliminar el archivo temporal después de cargarlo a Cloudinary
  return result; // Devolver el resultado de la carga de la imagen en Cloudinary
}

// Función asincrónica para eliminar una imagen de producto en Cloudinary
export async function deleteImageProduct(id) {
  const result = await cloudinary.uploader.destroy(id); // Eliminar la imagen por su ID en Cloudinary
  return result; // Devolver el resultado de la eliminación de la imagen en Cloudinary
}
