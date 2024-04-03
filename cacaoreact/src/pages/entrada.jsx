import React, { useState } from 'react';
import Header from '../components/header';
import { Link } from 'react-router-dom';

function Entrada() {
  const [producto, setProducto] = useState('');
  const [numeroEtiqueta, setNumeroEtiqueta] = useState('');
  const [kg, setKg] = useState('');
  const [lote, setLote] = useState('');

  const handleAñadirClick = () => {
    console.log('Añadir entrada:', producto, numeroEtiqueta, kg, lote);
  };

  return (
    <div className="bg-gray-200 min-h-screen">
      <Header />
      <div className="container mx-auto py-8">
      
        <p className="text-2xl font-bold mb-4">ENTRADA SACO</p>
        <div className="mb-4">
          <label htmlFor="producto" className="block mb-1">Producto:</label>
          <select
            id="producto"
            value={producto}
            onChange={(e) => setProducto(e.target.value)}
            className="w-1/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
          >
            <option value="">Seleccionar producto</option>
            <option value="Producto 1">Producto 1</option>
            <option value="Producto 2">Producto 2</option>
            <option value="Producto 3">Producto 3</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="numeroEtiqueta" className="block mb-1">Número de etiqueta:</label>
          <input
            type="text"
            id="numeroEtiqueta"
            value={numeroEtiqueta}
            onChange={(e) => setNumeroEtiqueta(e.target.value)}
            className="w-1/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="kg" className="block mb-1">Kilogramos (kg):</label>
          <input
            type="text"
            id="kg"
            value={kg}
            onChange={(e) => setKg(e.target.value)}
            className="w-1/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lote" className="block mb-1">Lote:</label>
          <input
            type="text"
            id="lote"
            value={lote}
            onChange={(e) => setLote(e.target.value)}
            className="w-1/4 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className=" justify-between items-center">
          <button
            onClick={handleAñadirClick}
            className=" bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
          >
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
}

export default Entrada;
