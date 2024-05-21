import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';

function Home() {
  return (
    <div className="bg-cdverde min-h-screen">
      <div className="container mx-auto max-w-[400px]">
        <Header back={false} />
        <div className='flex container justify-center'>
          <div className="grid grid-cols-2 gap-6 -mx-2" style={{ marginTop: '80px' }}> {/* Ajustado el valor de gap a 12 para más separación */}
            <Link to="/entrada" className="transition-all duration-500 transform">
              <button className="bg-cream hover:bg-hover-but text-[#40342a] font-bold py-2 px-4 rounded-lg w-40 h-32 text-2xl">
                Entrada
              </button>
            </Link>
            <Link to="/salida" className="transition-all duration-500 transform">
              <button className="bg-cream hover:bg-hover-but text-[#40342a] font-bold py-2 px-4 rounded-lg w-40 h-32 text-2xl">
                Salida
              </button>
            </Link>
            <Link to="/mover" className="transition-all duration-500 transform">
              <button className="bg-cream hover:bg-hover-but text-[#40342a] font-bold py-2 px-4 rounded-lg w-40 h-32 text-2xl">
                Mover
              </button>
            </Link>
            <Link to="/modificar" className="transition-all duration-500 transform">
              <button className="bg-cream hover:bg-hover-but text-[#40342a] font-bold py-2 px-4 rounded-lg w-40 h-32 text-2xl">
                Modificar
              </button>
            </Link>
            <Link to="/consulta" className="transition-all duration-500 transform hidden md:block">
              <button className="bg-cream hover:bg-hover-but text-[#40342a] font-bold py-2 px-4 rounded-lg w-40 h-32 text-2xl">
                Consultar
              </button>
            </Link>
            <Link to="/gestionarSalida" className="transition-all duration-500 transform hidden md:block">
              <button className="bg-cream hover:bg-hover-but text-[#40342a] font-bold py-4 px-4 rounded-lg w-40 h-32 text-2xl">
                Gestionar <br></br> Salida
              </button>
            </Link>
          </div>
        </div>
        <Footer/>
      </div>
    </div>
  );
}

export default Home;
