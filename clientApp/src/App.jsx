import "bootstrap/dist/css/bootstrap.min.css"; // Importa estilos de Bootstrap

import { MarketplaceProvider } from "./context"; // Importa MarketplaceProvider desde el archivo "context"

import { BrowserRouter, Route, Routes } from "react-router-dom"; // Importa componentes de enrutamiento de React

import { NavModel } from "./components/navbar/Navbar"; // Importa el componente NavModel desde "./components/navbar/Navbar"

import {
  InicioView,
  ProductosView,
  DetalleProductoView,
  IniciarSesionView,
  RegistrarUsuarioView,
  RegistrarProductoView,
  MiPerfilView,
  NotFoundView,
} from "./views"; // Importa varios componentes desde "./views"
import { Footer } from "./components/footer/Footer"; // Importa el componente Footer desde "./components/footer/Footer"


function App() {
  // Define la función del componente principal
  return (
    <div>
      <MarketplaceProvider>
        {" "}
        {/* Abre MarketplaceProvider */}
        <BrowserRouter>
          {" "}
          {/* Abre BrowserRouter para el enrutamiento */}
          <NavModel /> {/* Renderiza el componente NavModel */}
          <Routes>
            {" "}
            {/* Abre Routes para definir rutas */}
            <Route path="/" element={<InicioView />} />{" "}
            {/* Ruta para la vista de inicio */}
            <Route path="/productos" element={<ProductosView />} />{" "}
            {/* Ruta para la vista de productos */}
            <Route
              path="/productos/:categoria/:producto"
              element={<DetalleProductoView />}
            />{" "}
            {/* Ruta dinámica para detalles del producto */}
            <Route
              path="/iniciar-sesion"
              element={<IniciarSesionView />}
            />{" "}
            {/* Ruta para iniciar sesión */}
            <Route
              path="/registrar-usuario"
              element={<RegistrarUsuarioView />}
            />{" "}
            {/* Ruta para registrar usuario */}
            <Route path="/mi-perfil" element={<MiPerfilView />} />{" "}
            {/* Ruta para la vista de perfil */}
            <Route
              path="/registrar-producto"
              element={<RegistrarProductoView />}
            />{" "}
            {/* Ruta para registrar producto */}
            <Route path="/*" element={<NotFoundView />} />{" "}
            {/* Ruta para cualquier otra URL */}
          </Routes>{" "}
          {/* Cierra Routes */}
        </BrowserRouter>{" "}
        {/* Cierra BrowserRouter */}
        <Footer /> {/* Renderiza el componente Footer */}
      </MarketplaceProvider>{" "}
      {/* Cierra MarketplaceProvider */}
    </div>
  );
}

export default App; // Exporta el componente App como predeterminado
