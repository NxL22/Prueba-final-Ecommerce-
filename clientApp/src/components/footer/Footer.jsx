import React from 'react';
import './footer.scss';
import instagramLogo from '../../assets/logos/instagram.png'; // Ajusta esta ruta correctamente

export const Footer = () => {
    return (
      <footer className="bg-dark text-center">
        <p className='parrafo-footer'>🕹️RetroPlay👾</p>
        <div className='social-icons'>
          <a href='https://www.instagram.com/better.call.neil' target='_blank' rel='noopener noreferrer'>
            <img src={instagramLogo} alt='Instagram' className='instagram-icon' />
          </a>
        </div>
        <p className='copyright'>&copy; 2023 Neil Aular</p>
      </footer>
    );
}

