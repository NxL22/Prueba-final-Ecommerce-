import axios from "axios"; // Importa axios para realizar solicitudes HTTP
import React from "react"; // Importa React
import "./registrarUsuarioForm.scss"; // Importa estilos CSS desde un archivo llamado registrarUsuarioForm.scss
import { useState } from "react"; // Importa useState desde la biblioteca 'react'
import { useMarketplace } from "../../context"; // Importa el contexto global desde "../../context"
import "./RegistrarUsuarioForm.scss"

export const RegistrarUsuarioForm = () => {
  const [name, setName] = useState(""); // Estado para el campo de nombre
  const [email, setEmail] = useState(""); // Estado para el campo de correo electrónico
  const [password, setPassword] = useState(""); // Estado para el campo de contraseña
  const [emailError, setEmailError] = useState(false); // Estado para el error de correo electrónico
  const [passwordError, setPasswordError] = useState(false); // Estado para el error de contraseña
  const { setShowLogin } = useMarketplace(); // Obtiene el valor de setShowLogin desde el contexto global

  // Función para mostrar el formulario de inicio de sesión y limpiar los campos
  const handleShowLogin = () => {
    setShowLogin(true);
    handleClearFields();
  };

  // Función para manejar el registro de usuario
  const handleRegister = async (e) => {
    e.preventDefault(); // Evita el comportamiento predeterminado del formulario

    // Validación de campos vacíos
    if (!email || !password || !name) {
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
      // Realiza una solicitud POST a la URL de registro con nombre, email y password
      const response = await axios.post(
        "http://localhost:3000/users/register",
        {
          name,
          email,
          password,
        }
      );

      console.log("Registration successful:", response.data); // Muestra un mensaje en la consola en caso de registro exitoso
    } catch (error) {
      console.error("Registration failed:", error); // Muestra un mensaje de error en la consola en caso de registro fallido
    }
  };

  // Función para limpiar los campos y los errores
  const handleClearFields = () => {
    setName("");
    setEmail("");
    setPassword("");
    setEmailError(false);
    setPasswordError(false);
  };

  return (
    <div className="register">
      <form className="register-form">
        <p className="title-form">Registrarse</p>
        <div className={`input-container ${emailError ? "error" : ""}`}>
          <label>Correo Electrónico:</label>
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
        <div className="input-container">
          <label>Nombre:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div className="btn-container">
          <button
            onClick={handleRegister}
            className="register-btn"
            Registrarse
          />
        </div>
        <div className="iniciar-sesion">
        <button
          type="button"
          onClick={handleShowLogin}
          className="iniciarsesion-btn"
        >
          Iniciar Sesión
        </button>
        </div>
      </form>
    </div>
  );
};