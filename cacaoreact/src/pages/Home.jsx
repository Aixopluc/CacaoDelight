import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/footer';

function Home() {
  return (
    <div className="bg-cdverde min-h-screen"> 
      <div className="container mx-auto w-[400px]">
        <Header back={false} />
        <div className='flex container justify-center' style={{ marginTop: '80px' }}>
          <div className="grid grid-cols-2 gap-12 -mx-2" style={{ marginTop: '-40px' }}>
            <Link to="/entrada">
              <button className="bg-cream hover:bg-cream-light text-black-900 font-bold py-4 px-6 rounded w-40 h-24 text-2xl">
                Entrada
              </button>
            </Link>
            <Link to="/salida">
              <button className="bg-cream hover:bg-cream-light text-black-900 font-bold py-4 px-6 rounded w-40 h-24 text-2xl"> 
                Salida
              </button>
            </Link>
            <Link to="/mover">
              <button className="bg-cream hover:bg-cream-light text-black-900 font-bold py-4 px-6 rounded w-40 h-24 text-2xl"> 
                Mover
              </button>
            </Link>
            <Link to="/consulta">
              <button className="bg-cream hover:bg-cream-light text-black-900 font-bold py-4 px-6 rounded w-40 h-24 text-2xl"> 
                Consultar
              </button>
            </Link>
            <Link to="/modificar">
              <button className="bg-cream hover:bg-cream-light text-black-900 font-bold py-4 px-6 rounded w-40 h-24 text-2xl"> 
                Modificar
              </button>
            </Link>
            <Link to="/gestionarSalida">
              <button className="bg-cream hover:bg-cream-light text-black-900 font-bold py-4 px-6 rounded w-40 h-24 text-2xl"> 
                Gestionar <br></br> Salida
              </button>
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default Home;
