import React from 'react'
import { useMarketplace } from '../../context'

export const Aside = ({ page }) => {
  const { setCategoria } = useMarketplace()

  return (
    <aside className="shadow-aside">
      {
        (page === 'productos') ? <h4 className='my-4'>FILTROS</h4>
          : <h4 className='my-4'>CATEGORIAS</h4>
      }
      <div className={page === 'productos' ? 'categorias-productos' : 'categorias'}>
        <p onClick={() => setCategoria('all')}>TODAS</p>
        <p onClick={() => setCategoria('NINTENDO')} name="lala"><img src="https://res.cloudinary.com/dezwpnks0/image/upload/c_scale,w_50/v1693330540/Nintendo_red_logo.svg_ygqlsr.webp" alt="nintendo_logo" />  NINTENDO</p>
        <p onClick={() => setCategoria('PLAYSTATION')}> <img src="https://res.cloudinary.com/dezwpnks0/image/upload/c_scale,w_50/v1693330539/Playstation_logo_colour.svg_jpnqwn.webp" alt="logo_playstation" /> PLAYSTATION</p>
        <p onClick={() => setCategoria('SEGA')}><img src="https://res.cloudinary.com/dezwpnks0/image/upload/c_scale,w_50/v1693330539/sega_abtjgg.webp" alt="logo_sega" /> SEGA</p>
        <p onClick={() => setCategoria('ATARI')}><img src="https://res.cloudinary.com/dezwpnks0/image/upload/c_scale,w_50/v1693330540/atari_logo_by_dhlarson_d5qqh2n-fullview_fjpwjc.webp" alt="atari_logo" /> ATARI</p>
      </div>
    </aside>

  )
}
