// Importar la función createServer del módulo http
import { createServer } from "http";

// Importar la instancia de la aplicación Express desde el archivo "express.js"
import expressApp from "./express.js";

// Crear un servidor HTTP utilizando la instancia de la aplicación Express
const httpServer = createServer(expressApp);

// Exportar el servidor HTTP para que pueda ser utilizado en otros archivos
export default httpServer;
