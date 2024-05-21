import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeftIcon, ChevronRightIcon, PowerIcon } from '@heroicons/react/24/solid';
import Zoro from '../img/zoro.jpg';
import Kiko from '../img/kiko.png';

function Header(props) {
  const [hora, setHora] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setHora(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const toggleMenu = () => {
    setMenuClosing(true); // Indicar que el menú se está cerrando
    setTimeout(() => {
      setMenuOpen(!menuOpen); // Cambiar el estado del menú después de la animación
      setMenuClosing(false); // Indicar que la animación ha terminado
    }, 50); // Ajustar este valor según la duración de la animación
  };

  return (
    <div>
      <div className='flex justify-between pt-4 px-3 items-center'>
        <div className="relative flex items-center">
          <img src={Kiko} alt="Zoro" className="rounded-full" width={70} />
          <div className='flex flex-col justify-center text-left ml-4'>
            <h2 className='text-white font-bold'>Hola</h2>
            <div className="flex items-center">
              <h3 className='text-white'>Marina</h3>
              <button onClick={toggleMenu} className="text-white ml-2">
                <ChevronRightIcon className={`h-5 w-5 transition-transform duration-300 ${menuOpen ? 'transform rotate-90' : ''}`} />
              </button>
            </div>
            <div className={`absolute top-full mt-2 bg-white rounded shadow-lg p-4 w-48 z-10 ${menuClosing ? 'animate-slideOut' : 'animate-slideIn'}`} style={{ display: menuOpen ? 'block' : 'none' }}>
              <ul>
                <li className="px-4 py-2 text-black flex items-center"><PowerIcon className="h-4 w-4 text-slate-900 mr-2"/>Cerrar Sesión</li>
              </ul>
            </div>
          </div>
        </div>
        <div className='text-white text-3xl font-bold'>{hora}</div>
      </div>

      {props.back && (
        <div className='flex ml-3'>
          <Link to="/" className="text-black mt-4 mb-4">
            <ArrowLeftIcon className="h-6 w-6 text-cream" />
          </Link>
        </div>
      )}
    </div>
  );
}

export default Header;
