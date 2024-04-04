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
    <div className='flex justify-between pt-4 mx-3 items-center  '>
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
      <div className='flex ml-3'>
       
        <Link to="/" className=" text-black  mt-4 mb-4 ">
        <ArrowLeftIcon className="h-6 w-6 text-blue-700" />
        </Link>
        </div>

      )}
    
    
    </div>
  );
}

export default Header;
