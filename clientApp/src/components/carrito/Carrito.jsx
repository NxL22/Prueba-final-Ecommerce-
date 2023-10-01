import { useState } from "react";
import "./Carrito.scss";
import { useMarketplace } from "../../context";


const Carrito = () => {
  const { car, setCar } = useMarketplace();
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  

  const onEliminarProducto = (id) => {
    const carActualizado = car.filter((producto) => producto.id !== id);
    setCar(carActualizado);
  };

  const onActualizarCantidadProducto = (id, cantidad) => {
    const carActualizado = car.map((producto) => {
      if (producto.id === id) {
        return { ...producto, cantidad };
      }
      return producto;
    });
    setCar(carActualizado);
  };

  const toggleMostrarCarrito = () => {
    setMostrarCarrito(!mostrarCarrito);
  };

  return (
    <div>
      <button
        onClick={toggleMostrarCarrito}
        className={`mostrar-carrito-button ${mostrarCarrito ? "activo" : ""}`}
      >
        {mostrarCarrito ? "Cerrar 🛒" : "Mostrar 🛒"}
      </button>

      {mostrarCarrito && (
        <div className="modal-carrito">
          <button
            onClick={toggleMostrarCarrito}
            className={`mostrar-carrito-button ${mostrarCarrito ? "activo" : ""
              }`}
          >
            {mostrarCarrito ? "Cerrar 🛒" : "Mostrar 🛒"}
          </button>
          <div className="modal-content space-between">
            {car.length > 0 ? (
              <ul>
                {car.map((producto, index) => (
                  <li key={index}>
                    {producto.nombre} - ${producto.precio} - Cantidad:{" "}
                    {producto.cantidad}
                    <button onClick={() => onEliminarProducto(producto.id)}>
                      Eliminar
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>El carrito está vacío.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Carrito;
