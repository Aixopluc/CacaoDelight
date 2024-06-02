import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, ChevronRightIcon, PowerIcon, UserIcon } from '@heroicons/react/24/solid';
import Kiko from '../img/kiko.png';

function Header(props) {
  const [hora, setHora] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  const navigate = useNavigate();
  const name = localStorage.getItem('name') || '';
  const rol = localStorage.getItem('rol');
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const interval = setInterval(() => {
      setHora(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);

    if (!token) {
      navigate('/login');
    }

    return () => clearInterval(interval);
  }, [navigate, token]);

  const toggleMenu = () => {
    setMenuClosing(true);
    setTimeout(() => {
      setMenuOpen(!menuOpen);
      setMenuClosing(false);
    }, 100);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    setToken(null);
    navigate('/login');
  };

  function mayus(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  return (
    <div>
      <div className='flex justify-between pt-4 px-3 items-center'>
        <div className="relative flex items-center">
          <img src={Kiko} alt="Kiko" className="rounded-full" width={70} />
          <div className='flex flex-col justify-center text-left ml-4'>
            <h2 className='text-white font-bold'>Hola</h2>
            <div className="flex items-center">
              <h3 className='text-white'>{mayus(name)}</h3>
              <button onClick={toggleMenu} className="text-white ml-2">
                <ChevronRightIcon className={`h-5 w-5 transition-transform duration-300 ${menuOpen ? 'transform rotate-90' : ''}`} />
              </button>
            </div>
            <div className={`absolute top-full mt-2 bg-white bg-opacity-60 backdrop-blur-sm rounded shadow-lg p-4 w-48 z-10 ${menuClosing ? 'animate-slideOut' : 'animate-slideIn'}`} style={{ display: menuOpen ? 'block' : 'none' }}>
              <ul>
                <li className="px-4 py-2 text-black flex items-center hover:cursor-pointer" onClick={handleLogout}><PowerIcon className="h-4 w-4 text-slate-900 mr-2" />Cerrar Sesión</li>
                {rol === '1' && (
                  <li className="px-4 py-2 text-black flex items-center hover:cursor-pointer" onClick={() => navigate("/register")}>
                    <UserIcon className="h-4 w-4 text-slate-900 mr-2" />
                    Crear usuario
                  </li>
                )}
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
