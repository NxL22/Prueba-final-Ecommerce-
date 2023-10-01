import passport from "passport"; // Importar la biblioteca Passport para autenticación
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt"; // Importar las estrategias JWT de Passport
import dotenv from "dotenv"; // Importar la biblioteca dotenv para configurar variables de entorno
import USER from "../database/user.entity.js"; // Importar el modelo de datos de usuario desde un archivo separado

dotenv.config(); // Cargar las variables de entorno desde el archivo .env

const secretKey = process.env.JWT_SECRET_KEY; // Obtener la clave secreta para firmar y verificar tokens JWT desde las variables de entorno

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extraer el token JWT del encabezado de autorización
  secretOrKey: secretKey, // Utilizar la clave secreta para verificar la firma del token JWT
};

// Configurar Passport para utilizar la estrategia JWT
passport.use(
  new JwtStrategy(opts, async (jwtPayload, done) => {
    try {
      // Buscar al usuario en la base de datos por su ID de usuario en el token JWT
      const user = await USER.findOne({ where: { id: jwtPayload.userId } });

      if (!user) {
        // Si el usuario no se encuentra, devolver un error
        return done(null, false);
      }

      // Si se encuentra el usuario, pasar el usuario autenticado a las rutas protegidas
      return done(null, user);
    } catch (error) {
      // Manejar errores si ocurren durante la verificación del token
      return done(error, false);
    }
  })
);

// Middleware de Passport para autenticar con JWT (sin crear una sesión)
export const authenticateJWT = passport.authenticate("jwt", { session: false });

// Middleware personalizado para verificar si el usuario autenticado es un administrador
export const isAdmin = (req, res, next) => {
  // Verificar si el usuario autenticado es un administrador
  if (req.user && req.user.isAdmin) {
    // El usuario es un administrador, continuar con la ejecución
    next();
  } else {
    // El usuario no es un administrador, devolver un error de acceso no autorizado
    res
      .status(403)
      .json({ message: "Acceso no autorizado para administradores" });
  }
};
