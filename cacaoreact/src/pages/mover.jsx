import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import axios from 'axios';

function Mover() {
  const [numeroPale, setNumeroPale] = useState('');
  const [nuevaUbicacion, setNuevaUbicacion] = useState('');

  const handleInputChange = (event) => {
    setNumeroPale(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Llamar a la función para mover el pale
    moverPale();
  };

  const moverPale = () => {
    // Convertir el número de pale a entero antes de enviarlo al servidor
    const eti = parseInt(numeroPale);
    axios.post('http://localhost:8080/pale/move', { eti: eti, ubi: nuevaUbicacion })
      .then(response => {
        // Manejar la respuesta del backend
        // Por ejemplo, si la respuesta indica que el número de pale existe, actualiza el estado correspondiente
        // Por ejemplo, setNumeroExiste(true)
      })
      .catch(error => {
        // Manejar cualquier error que pueda ocurrir durante la llamada
        console.error('Error al mover el pale:', error);
      });
  };

  return (
    <div className="bg-cdverde min-h-screen">
      <div className="container mx-auto w-[400px]">
        <Header back={true} />
        <p className="text-2xl font-bold mb-4 text-cream">MOVER PRODUCTO</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="numeroPale" className="block mb-1 text-cream text-left ml-4">Número de pale:</label>
            <input
              type="text"
              id="numeroPale"
              name="NumeroPale"
              value={numeroPale}
              onChange={handleInputChange}
              className="w-11/12 px-3 py-2 border-2 border-cream rounded-md shadow-sm focus:outline-none bg-grisin text-cdverde"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="ubicacion" className="block mb-1 text-cream text-left ml-4">Ubicación:</label>
            <input
              type="text"
              id="ubicacion"
              name="ubicacion"
              value={nuevaUbicacion}
              onChange={(event) => setNuevaUbicacion(event.target.value)}
              className="w-11/12 px-3 py-3 border border-cream rounded-lg shadow-sm focus:outline-none focus:border-blue-500 bg-grisin"
            />
          </div>
          <button type="submit" className="bg-cream text-cdverde px-4 py-2 rounded-md">
            Verificar
          </button>
        </form>
      </div>
    </div>
  );
}
  
export default Mover;