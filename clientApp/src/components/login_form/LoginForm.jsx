import axios from "axios"; // Importa axios para realizar solicitudes HTTP
import "./LoginForm.scss";
import { useState } from "react"; // Importa useState desde la biblioteca 'react'
import { useMarketplace } from "../../context"; // Importa el contexto global desde "../../context"
import "bootstrap/dist/css/bootstrap.min.css"; //NUEVO 


export const LoginForm = () => {
  const [email, setEmail] = useState(""); // Estado para el campo de correo electrónico
  const [password, setPassword] = useState(""); // Estado para el campo de contraseña
  const [emailError, setEmailError] = useState(false); // Estado para el error de correo electrónico
  const [passwordError, setPasswordError] = useState(false); // Estado para el error de contraseña
  const { setShowLogin , setIsModalOpen} = useMarketplace(); // Obtiene el valor de setShowLogin desde el contexto global
  //NUEVO
  const [successAlert, setSuccessAlert] = useState(false);
const [errorAlert, setErrorAlert] = useState(false);


  // Función para ocultar el formulario de inicio de sesión y limpiar los campos
  const handleShowLogin = () => {
    setShowLogin(false);
    handleClearFields();
  };

  // Función para manejar el inicio de sesión
  const handleLogin = async (e) => {
    e.preventDefault(); // Evita el comportamiento predeterminado del formulario
  
    // Validación de campos vacíos
    if (!email || !password) {
      setEmailError(!email);
      setPasswordError(!password);
      return;
    }
  
    // Validación de formato de correo electrónico
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      return;
    }
  
    // Validación de longitud mínima de contraseña
    if (password.length < 6) {
      setPasswordError(true);
      return;
    }
  
    try {
      // Realiza una solicitud POST a la URL de inicio de sesión con email y password
      const response = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });
  

      if (response.data && response.data.token) {
        
        localStorage.setItem("token", response.data.token);
      }
  
      

      // Cierra el modal u realiza otras acciones necesarias
      setIsModalOpen(false);
      console.log("Login successful:", response.data); // Muestra un mensaje en la consola en caso de inicio de sesión exitoso
    } catch (error) {
      console.error("Login failed:", error); // Muestra un mensaje de error en la consola en caso de inicio de sesión fallido
    }
  };
  

  // Función para limpiar los campos y los errores
  const handleClearFields = () => {
    setEmail("");
    setPassword("");
    setEmailError(false);
    setPasswordError(false);
  };

  return (
    <div className="login">
      <form className="login-form">
        <p className="title-form">Inicia Sesión</p>
        <div className={`input-container ${emailError ? "error" : ""}`}>
          <label>Corre Electrónico:</label>
          <input
            type="text"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setEmailError(false);
            }}
          />
          {emailError && (
            <span className="error-message">
              Formato invalido de correo electrónico
            </span>
          )}
        </div>
        <div className={`input-container ${passwordError ? "error" : ""}`}>
          <label>Contraseña:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setPasswordError(false);
            }}
          />
          {passwordError && (
            <span className="error-message">
              La contraseña debe tener al menos 6 caracteres
            </span>
          )}
        </div>
        <div className="btn-container">
          <button onClick={handleLogin} className="login-btn" />
        </div>
        <button
          type="button"
          onClick={handleShowLogin}
          className="show-login-btn"
        >
          Registrarse
        </button>
      </form>
    </div>
    
  );
};

export default LoginForm;
