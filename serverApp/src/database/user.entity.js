import { DataTypes } from "sequelize";
import sequelize from "../config/db.js";
import { v4 as uuidv4 } from "uuid";

// Definir el modelo de datos "USER"
const USER = sequelize.define(
  "User", // Nombre de la tabla en la base de datos
  {
    id: {
      type: DataTypes.UUID, // Tipo de dato para el campo "id"
      primaryKey: true, // Establecer como clave primaria
      defaultValue: uuidv4, // Valor predeterminado generado automáticamente usando uuidv4
      unique: true, // Establecer como único (no se pueden repetir los valores)
    },
    profilePicture: {
      type: DataTypes.STRING, // Tipo de dato para el campo "profilePicture"
      allowNull: true, // Permitir que sea nulo
      defaultValue: null, // Valor predeterminado nulo
    },
    profilePublicId: {
      type: DataTypes.STRING, // Tipo de dato para el campo "profilePublicId"
      allowNull: true, // Permitir que sea nulo
      defaultValue: null, // Valor predeterminado nulo
    },
    isAdmin: {
      type: DataTypes.BOOLEAN, // Tipo de dato para el campo "isAdmin"
      allowNull: false, // No se permite que sea nulo
      defaultValue: false, // Valor predeterminado: falso
    },
    fullname: {
      type: DataTypes.STRING, // Tipo de dato para el campo "fullname"
      allowNull: false, // No se permite que sea nulo
    },
    email: {
      type: DataTypes.STRING, // Tipo de dato para el campo "email"
      allowNull: false, // No se permite que sea nulo
      unique: true, // Establecer como único (no se pueden repetir los valores)
    },
    password: {
      type: DataTypes.STRING, // Tipo de dato para el campo "password"
      allowNull: false, // No se permite que sea nulo
    },
    status: {
      type: DataTypes.ENUM("active", "inactive"), // Tipo de dato ENUM para el campo "status" con dos valores permitidos: "active" e "inactive"
      defaultValue: "inactive", // Valor predeterminado: "inactive"
    },
  },
  {
    timestamps: false, // Deshabilitar la generación automática de timestamps (createdAt y updatedAt)
    modelName: "User", // Nombre del modelo en Sequelize
  }
);




export default USER;
