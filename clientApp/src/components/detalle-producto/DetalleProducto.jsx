import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './detalleProducto.scss';
import { useMarketplace } from "../../context";


// Importa los logos correspondientes
import NINTENDO from '../../assets/logos/nintendo.png';
import SEGA from '../../assets/logos/sega.png';
import PLAYSTATION from '../../assets/logos/playstation.png';
import ATARI from '../../assets/logos/atari.png';

export const DetalleProducto = () => {
  const { producto, categoria } = useParams(); // Obtiene el parámetro de la URL
  const [product, setProduct] = useState({});
  const { agregarProductoAlCarrito } = useMarketplace(); //AQUI 

  useEffect(() => {
    const fetchProductoDetalle = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/product/${producto}`
        );
        const data = await response.json();
        console.log(data);
        setProduct(data);
      } catch (error) {
        console.error("Error en la solicitud:", error);
      }
    };

    fetchProductoDetalle();
  }, [producto]);

  const onAgregarAlCarrito = () => {
    // Lógica para agregar el producto al carrito
    agregarProductoAlCarrito({
      id: product.id,
      nombre: product.nombre,
      precio: product.price,
      cantidad: 1, // Puedes ajustar la cantidad según tus necesidades
    });
  }; //AQUI NUEVO


  // Define un objeto que mapea categorías a los logos correspondientes
  const logos = {
    NINTENDO,
    SEGA,
    PLAYSTATION,
    ATARI,
  };

  return (
    <div className="detalle-producto">
      <div className="logo-producto">
        <img src={logos[categoria]} alt="Logo de la marca" />
      </div>
      <div className="producto-info">
        <h2 className="producto-nombre">{product.nombre}</h2>
        <p className="producto-descripcion">{product.descripcion}</p>
        <div className="producto-imagen">
          <img src={product.imageProfile} alt="Producto" />
        </div>
        <p className="producto-precio">
          <big>Precio:</big>
          <strong>$ {product.price}</strong>
        </p>
        <p><strong>Descripción:</strong></p>
        <strong> {product.description}</strong>
        <button className="agregar-carrito" onClick={onAgregarAlCarrito}>
          Agregar al Carrito 🛒
        </button>
      </div>
    </div>
  );
};
