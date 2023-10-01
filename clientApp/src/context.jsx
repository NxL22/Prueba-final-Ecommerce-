import React, { createContext, useState, useEffect, useContext } from "react";

const MarketplaceContext = createContext({});

export const MarketplaceProvider = ({ children }) => {
  const [productos, setProductos] = useState([]);
  const [categoria, setCategoria] = useState("all");
  const [pageProductos, setPageProductos] = useState([]);
  const [showLogin, setShowLogin] = useState(true);
  const [showModal, setShowModal] = useState(true);
  const [car, setCar] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(true);

  const agregarProductoAlCarrito = (producto) => {
    // Verifica si el producto ya está en el carrito
    const productoExistente = car.find(item => item.id === producto.id);

    if (productoExistente) {
      // Si el producto ya está en el carrito, actualiza la cantidad
      const carritoActualizado = car.map(item =>
        item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
      );
      setCar(carritoActualizado);
    } else {
      // Si el producto no está en el carrito, agrégalo al carrito con cantidad 1
      setCar([...car, { ...producto, cantidad: 1 }]);
    }
  };

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch('http://localhost:3000/product');
        const data = await response.json();
        setProductos(data);
        setPageProductos(data);
      } catch (error) {
        console.error("Error en el fetch", error);
      }
    };

    fetchProductos();
  }, []);

  useEffect(() => {
    const filtrarProductos = () => {
      if (categoria !== "all") {
        const newProductos = productos.filter(
          (producto) => producto.category === categoria
        );
        setPageProductos(newProductos);
      } else if (categoria === "all") {
        setPageProductos(productos);
      }
    };
    filtrarProductos();
  }, [categoria, productos]);

  const globalState = {
    isModalOpen,
    setIsModalOpen,
    car,
    setCar,
    productos,
    pageProductos,
    setPageProductos,
    categoria,
    setCategoria,
    showLogin,
    setShowLogin,
    showModal,
    setShowModal,
    agregarProductoAlCarrito,
  };

  return (
    <MarketplaceContext.Provider value={globalState}>
      {children}
    </MarketplaceContext.Provider>
  );
};

export const useMarketplace = () => {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error(
      "useMarketplace debe ser utilizado dentro de un MarketplaceProvider"
    );
  }
  return context;
};
