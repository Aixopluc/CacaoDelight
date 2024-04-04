import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header';

function Home() {
  return (
    <div>
      <Header />
      <div className='flex container justify-center'>
        <div className="grid grid-cols-2 gap-12 -mx-2" style={{ marginTop: '80px' }}> {/* Ajustado el valor de gap a 12 para más separación */}
          <Link to="/entrada">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-40 h-24 text-2xl">
              Entrada
            </button>
          </Link>
          <Link to="/salida">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-40 h-24 text-2xl">
              Salida
            </button>
          </Link>
          <Link to="/mover">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-40 h-24 text-2xl">
              Mover
            </button>
          </Link>
          <Link to="/consultar">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-40 h-24 text-2xl">
              Consultar
            </button>
          </Link>
          <Link to="/modificar">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-40 h-24 text-2xl">
              Modificar
            </button>
          </Link>
          <Link to="/gestionarSalida">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-40 h-24 text-2xl">
              Gestionar <br></br> Salida
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
