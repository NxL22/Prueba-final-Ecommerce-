import React, { useState, useEffect } from 'react';
import { FaUserPlus } from 'react-icons/fa';
import './MiPerfil.scss';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';
import { Link } from 'react-router-dom';  


export const MiPerfil = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleChangeImage = () => {
    // Obtén el token de administrador del localStorage
    const adminToken = localStorage.getItem("token");

    // Configura los encabezados de la solicitud axios con el token de administrador
    const headers = {
      Authorization: `Bearer ${adminToken}`,
      "Content-Type": "multipart/form-data", // Importante para enviar archivos
    };

    // Crea un objeto FormData y agrega la imagen
    const formData = new FormData();
    formData.append("image", profileImage); // Asegúrate de que 'profileImage' contenga la imagen

    // Realiza la solicitud PUT al servidor con el FormData y los encabezados
    axios
      .put("http://localhost:3000/user/change/profile-image", formData, { headers })
      .then((response) => {
        console.log("Imagen subida exitosamente:", response.data);
      })
      .catch((error) => {
        console.error("Error al subir la imagen:", error);
      });
  };

  const onDrop = (acceptedFiles) => {
    const image = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      setProfileImage(reader.result);
    };
    reader.readAsDataURL(image);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: "image/*",
  });

  useEffect(() => {
    const adminToken = localStorage.getItem("token");
    const headers = {
      Authorization: `Bearer ${adminToken}`,
    };

    axios
      .get("http://localhost:3000/auth/profile", { headers })
      .then((response) => {
        const userData = response.data;
        setName(userData.fullname);
        setEmail(userData.email);
        setProfileImage(userData.profilePicture);
        console.log('aaaaaaaaaaaa');
        console.log(userData);
      })
      .catch((error) => {
        console.error("Error al obtener los datos del usuario:", error);
      });
  }, []);

  return (
    <div className="perfil-card">
      <div className="profile-image" {...getRootProps()}>
        <input {...getInputProps()} />
        <div className="profile-image-inner">
          {profileImage ? (
            <img
              src={profileImage}
              alt="Imagen de perfil"
              className="profile-image"
            />
          ) : (
            <div className="profile-circle"></div>
          )}
        </div>
      </div>
      <div className="profile-info">
        {isEditing ? (
          <div className="input-container">
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              placeholder="Nombre"
            />
            <input
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Correo electrónico"
            />
            <button
              onClick={() => {
                toggleEditing();
                handleChangeImage();
              }}
            >
              Guardar
            </button>
          </div>
        ) : (
          <>
            <h2>{name}</h2>
            <p>{email}</p>
            <button onClick={toggleEditing}>Editar</button>
          </>
        )}
      </div>
      <Link to="/registrar-producto">
        <button className="add-product-button">
          <FaUserPlus />
        </button>
      </Link>
    </div>
  );
}
