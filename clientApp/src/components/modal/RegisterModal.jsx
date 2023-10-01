import { LoginForm } from "../login_form/LoginForm";
import { RegistrarUsuarioForm } from "../registrar-usuario_form/RegistrarUsuarioForm";
import { useMarketplace } from "../../context";
import "./registerModal.scss";



const RegisterModal = () => {

  
  const {setIsModalOpen, isModalOpen, showLogin } = useMarketplace();


  // Función para cerrar el modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Agrega un manejador de eventos para abrir el modal


  return (
    <>
      {isModalOpen && (
        <div className="container-modal" onClick={closeModal}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            {showLogin ? <LoginForm /> : <RegistrarUsuarioForm />}
          </div>
        </div>
      )}

      {/* Botón u otro elemento para abrir el modal */}

    </>
  );
};

export default RegisterModal;