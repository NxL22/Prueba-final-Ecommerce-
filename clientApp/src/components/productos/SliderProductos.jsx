import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

export const SliderProductos = ({ handleSelect, index, pageProductos }) => {
  return (
    <Carousel activeIndex={index} onSelect={handleSelect} interval={null}>
      {pageProductos.map((producto, productoIndex) => {
        if (productoIndex % 6 === 0) {
          const grupoProductos = pageProductos.slice(productoIndex, productoIndex + 6);

          return (
            <Carousel.Item key={productoIndex}>
              <div className="page-counter">
                <h1 className="text-light">PRODUCTOS</h1>
                Página {index + 1} de {Math.ceil(pageProductos.length / 6)}
              </div>
              <main>
                {grupoProductos.map((productoGrupo) => (
                  <div key={productoGrupo.id} className={`producto-${productoGrupo.id}`}>
                    <div className="producto-datos shadow">
                      <img
                        src={productoGrupo.imageProfile}
                        style={{ width: '100%' }}
                        alt={productoGrupo.name}
                      />
                      <h3>{productoGrupo.name}</h3>
                      <p>${productoGrupo.price}</p>
                      {/* Corregido el uso de <link> */}
                      <a className='mx-5' href={`/productos/${productoGrupo.category}/${productoGrupo.id}`}>
                        Detalles del producto🕵️‍♂️
                      </a>
                      <div>
                      </div>
                    </div>
                  </div>
                ))}
              </main>
            </Carousel.Item>
          );
        }
        return null;
      })}
    </Carousel>
  );
};
