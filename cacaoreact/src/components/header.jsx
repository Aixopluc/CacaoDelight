import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Zoro from '../img/zoro.jpg';

function Mover(props) {
  const [hora, setHora] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  useEffect(() => {
    const interval = setInterval(() => {
      setHora(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
    <div className='flex justify-between py-4 mx-3 items-center  '>
      <div className="flex justify-center">
        <img src={Zoro} alt="Zoro" className="rounded-full" width={70} />
        <div className='flex flex-col justify-center text-left ml-4'>
        <h2 className=' text-blue-700 font-bold'>Hola</h2>
        <h3>Marina</h3>
      </div>
      </div>
      
      <div className='bg-blue-700 py-2 px-6 text-white text-lg rounded-full h-12  '>{hora}</div>
    </div>

    {props.back && (
        <Link to="/" className="bg-blue-500 text-white px-4 py-2 rounded-md focus:outline-none hover:bg-blue-600 focus:bg-gray-600">
          Volver
        </Link>
      )}
    
    
    </div>
  );
}

export default Mover;
