// Importar las dependencias necesarias
import { DataTypes } from "sequelize"; // Importar el tipo de dato DataTypes de Sequelize
import sequelize from "../config/db.js"; // Importar la instancia de Sequelize configurada
import { v4 as uuidv4 } from 'uuid'; // Importar la función uuidv4 para generar identificadores únicos

// Definir el modelo de datos "IMAGE"
const IMAGE = sequelize.define(
  "image", // Nombre de la tabla en la base de datos
  {
    id: {
      type: DataTypes.UUID, // Tipo de dato para el campo "id"
      primaryKey: true, // Establecer como clave primaria
      defaultValue: uuidv4, // Valor predeterminado generado automáticamente usando uuidv4
      unique: true, // Establecer como único (no se pueden repetir los valores)
    },
    relationId: {
      type: DataTypes.UUID, // Tipo de dato para el campo "relationId"
      allowNull: false, // No se permite que sea nulo
    },
    publicId: {
      type: DataTypes.STRING, // Tipo de dato para el campo "publicId"
    },
    imageUrlSecurity: {
      type: DataTypes.STRING, // Tipo de dato para el campo "imageUrlSecurity"
    },
  },
  {
    timestamps: false, // Deshabilitar la generación automática de timestamps (createdAt y updatedAt)
  }
);

export default IMAGE; 

