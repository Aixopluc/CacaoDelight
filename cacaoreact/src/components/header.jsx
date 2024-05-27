import React, { useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeftIcon, ChevronRightIcon, PowerIcon, UserIcon } from '@heroicons/react/24/solid';
import Zoro from '../img/zoro.jpg';
import Kiko from '../img/kiko.png';
import Switch from './switch';

function Header(props) {
  const [hora, setHora] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuClosing, setMenuClosing] = useState(false);
  const navigate = useNavigate(); // Obtener la función de navegación
  const name = localStorage.getItem('name')
  const rol = localStorage.getItem('rol');
  useEffect(() => {
    const interval = setInterval(() => {
      setHora(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);

    const token = localStorage.getItem('token');
   
    if (!token) {
      navigate('/login');
    }

    return () => clearInterval(interval);
  }, [navigate]);

  const toggleMenu = () => {
    setMenuClosing(true); // Indicar que el menú se está cerrando
    setTimeout(() => {
      setMenuOpen(!menuOpen); // Cambiar el estado del menú después de la animación
      setMenuClosing(false); // Indicar que la animación ha terminado
    }, 100); // Ajustar este valor según la duración de la animación
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('name')
    navigate('/login'); // Redirigir al usuario a la página de inicio de sesión
  };

  function mayus(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }
  
  return (
    <div>
      <div className='flex justify-between pt-4 px-3 items-center'>
        <div className="relative flex items-center">
          <img src={Kiko} alt="Zoro" className="rounded-full" width={70} />
          <div className='flex flex-col justify-center text-left ml-4'>
            <h2 className='text-white font-bold'>Hola</h2>
            <div className="flex items-center">
              <h3 className='text-white'>{mayus(name)}</h3>
              <button onClick={toggleMenu} className="text-white ml-2">
                <ChevronRightIcon className={`h-5 w-5 transition-transform duration-300 ${menuOpen ? 'transform rotate-90' : ''}`} />
              </button>
            </div>
            {/* MENU DESPLEGABLE */}
            <div className={`absolute top-full mt-2 bg-white bg-opacity-60 backdrop-blur-sm rounded shadow-lg p-4 w-48 z-10 ${menuClosing ? 'animate-slideOut' : 'animate-slideIn'}`} style={{ display: menuOpen ? 'block' : 'none' }}>
              <ul>
                <li className="px-4 py-2 text-black flex items-center hover:cursor-pointer" onClick={handleLogout}><PowerIcon className="h-4 w-4 text-slate-900 mr-2"/>Cerrar Sesión</li>
                {rol == 1 && (
                  <li className="px-4 py-2 text-black flex items-center hover:cursor-pointer" onClick={()=> navigate("/register")}>
                    <UserIcon className="h-4 w-4 text-slate-900 mr-2" />
                    Crear usuario
                  </li>
                )}
              </ul>
            </div>
            {/* FIN MENU */}
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
