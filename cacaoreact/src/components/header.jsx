import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Zoro from '../img/zoro.jpg';

function Mover(props) {
  const [hora, setHora] = useState(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));

  useEffect(() => {
    if (leido && Object.keys(pale).length > 0) {
      setPale(prevPale => ({
        ...prevPale,
        NumeroDePale: numeroPale
      }));
    }
  }, [leido, numeroPale]);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setNumeroPale(value);
  };

  const enviarDatosPale = async () => {
    try {
      await axios.post(`http://localhost:8080/pale/${pale.NumeroDePale}`, pale);
      setLeido(true);
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  }
  
  const handleSubmit = (event) => {
    event.preventDefault();
    enviarDatosPale();
  };

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
