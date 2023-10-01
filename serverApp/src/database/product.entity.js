// Importar las dependencias necesarias
import { DataTypes } from "sequelize"; // Importar el tipo de dato DataTypes de Sequelize
import sequelize from "../config/db.js"; // Importar la instancia de Sequelize configurada
import { v4 as uuidv4 } from "uuid"; // Importar la función uuidv4 para generar identificadores únicos
import IMAGE from "./images.entity.js"; // Importar el modelo de datos "IMAGE" desde el archivo "images.entity.js"
import CategoryType from "../common/type-category-enum.js"; // Importar un enumerador de tipos de categoría (esto no se muestra en el código, pero se asume que está definido en el archivo "type-category-enum.js")

// Definir el modelo de datos "PRODUCT"
const PRODUCT = sequelize.define(
  "product", // Nombre de la tabla en la base de datos
  {
    id: {
      type: DataTypes.UUID, // Tipo de dato para el campo "id"
      primaryKey: true, // Establecer como clave primaria
      defaultValue: uuidv4(), // Valor predeterminado generado automáticamente usando uuidv4
      unique: true, // Establecer como único (no se pueden repetir los valores)
    },
    category: {
      type: DataTypes.ENUM, // Tipo de dato ENUM para el campo "category"
      values: [CategoryType.NINTENDO, CategoryType.PLAYSTATION, CategoryType.ATARI, CategoryType.SEGA], // Valores permitidos basados en el enumerador "CategoryType"
      allowNull: false, // No se permite que sea nulo
    },
    imageProfile: {
      type: DataTypes.STRING, // Tipo de dato para el campo "imageProfile"
    },
    description: {
      type: DataTypes.STRING, // Tipo de dato para el campo "description"
      allowNull: false, // No se permite que sea nulo
    },
    code: {
      type: DataTypes.STRING, // Tipo de dato para el campo "code"
      allowNull: false, // No se permite que sea nulo
    },
    name: {
      type: DataTypes.STRING, // Tipo de dato para el campo "name"
      allowNull: false, // No se permite que sea nulo
    },
    price: {
      type: DataTypes.FLOAT, // Tipo de dato para el campo "price" (cambiado a FLOAT ya que el precio generalmente es un número decimal)
    },
    quantity: {
      type: DataTypes.INTEGER, // Tipo de dato para el campo "quantity" (cambiado a INTEGER ya que la cantidad generalmente es un número entero)
    },
    status: {
      type: DataTypes.ENUM, // Tipo de dato ENUM para el campo "status"
      values: ["active", "inactive"], // Valores permitidos
      defaultValue: "active", // Valor predeterminado
    },
  },
  {
    timestamps: false, // Deshabilitar la generación automática de timestamps (createdAt y updatedAt)
  }
);

// Establecer la relación "PRODUCT hasMany IMAGE" con la clave foránea "productId"
PRODUCT.hasMany(IMAGE, { foreignKey: "productId" });



export default PRODUCT;
