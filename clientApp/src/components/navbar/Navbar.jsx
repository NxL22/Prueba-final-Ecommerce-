import { Navbar, Container } from "react-bootstrap"; // Importa los componentes Navbar y Container de react-bootstrap
import { NavLink } from "react-router-dom"; // Importa NavLink de react-router-dom para manejar las rutas
import "./navbar.scss"; // Importa estilos CSS desde un archivo llamado navbar.scss
import { useMarketplace } from "../../context"; // Importa el contexto global desde "../../context"
import RegisterModal from "../modal/RegisterModal"; // Importa el componente RegisterModal desde "../modal/RegisterModal"
import Carrito from "../../components/carrito/Carrito";
import logo from "../../assets/logos/logo.png"


export const NavModel = () => {
  const { showModal, setShowModal } = useMarketplace(); // Obtiene el valor de showModal y setShowModal desde el contexto global


  // Función para cambiar el estado de showModal y abrir/cerrar el modal
  const handleChangeModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container className="space-between">
          <div className="header-container">
            <div className="logo-container">
              <img src={logo} alt="Logo de la aplicación" className="logo" />
            </div>
            <div className="retroplay-text">
              RetroPlay
            </div>
          </div>

          <div>
            {/* Enlaces de navegación */}
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "navLink")}
              to="/"
            >
              Inicio
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "navLink")}
              to="/productos"
            >
              Productos
            </NavLink>
            <NavLink
              className={({ isActive }) => (isActive ? "active" : "navLink")}
              to="/mi-perfil"
            >
              Mi Perfil
            </NavLink>
            <button
              className={({ isActive }) => (isActive ? "active" : "navLink")}
              onClick={handleChangeModal}
            >
              Iniciar sesión
            </button>
          </div>
          {/* Renderiza el componente RegisterModal si showModal es verdadero, de lo contrario, muestra null */}
          {showModal ? null : <RegisterModal />}
          <Carrito />
        </Container>
      </Navbar>
    </>
  );
};