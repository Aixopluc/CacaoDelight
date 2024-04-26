import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Zoro from '../img/zoro.jpg';
import { ArrowLeftIcon, BeakerIcon } from '@heroicons/react/24/solid'

function Header(props) {
  const [hora, setHora] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  useEffect(() => {
    const interval = setInterval(() => {
      setHora(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className='flex justify-between pt-4 mx-3 items-center'>
        <div className="flex justify-center items-center">
          <img src={Zoro} alt="Zoro" className="rounded-full" width={70} />
          <div className='flex flex-col justify-center text-left ml-4'>
            <h2 className='text-white font-bold'>Hola</h2>
            <h3 className='text-white'>Marina</h3>
          </div>
        </div>

        <div className='text-white text-lg rounded-full h-12 ml-auto'>{hora}</div>
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
