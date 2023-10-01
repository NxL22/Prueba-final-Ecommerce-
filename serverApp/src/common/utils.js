// Configuración de opciones para la carga de archivos
export const uploadOptions = {
  // Establecer límite de tamaño de archivo en 50 megabytes
  limits: { fileSize: 50 * 1024 * 1024 },

  // Usar archivos temporales para almacenar los archivos subidos
  useTempFiles: true,

  // Directorio donde se guardarán los archivos temporales
  tempFileDir: "./uploads",
};
