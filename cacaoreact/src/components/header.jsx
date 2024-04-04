import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Zoro from '../img/zoro.jpg';

function Mover() {
  const [hora, setHora] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  useEffect(() => {
    const interval = setInterval(() => {
      setHora(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className='container mx-auto flex justify-between w-1/4 pt-4  '>
      <div className="w-1/4 h-16">
        <img src={Zoro} alt="Zoro" className="rounded-full" />
        {/* { <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-blue-600 focus:bg-gray-600">
          Volver a Inicio
        </Link> } */}
      </div>
      <div className='w-2/4'>
        <h2 className=' text-blue-700 font-bold'>Hola</h2>
        <h3>nombre</h3>
      </div>
      <div className='bg-blue-700 py-2 px-4 text-white text-lg rounded-full h-12 w-1/4 '>{hora}</div>
    </div>
  );
}

export default Mover;
