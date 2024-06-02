import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import axios from 'axios';

function Mover() {
  const [numeroPale, setNumeroPale] = useState('');
  const [nuevaUbicacion, setNuevaUbicacion] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

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
    const token = localStorage.getItem('token')
    const respons = axios.post('http://localhost:8080/pale/move', { eti: eti, ubi: nuevaUbicacion }, {
      headers: {
        Authorization: token // Establece el token en el encabezado de autorización
      }
    })
      .then(response => {
        setModalVisible(true)
        setModalMessage(response.data.message);
        setNuevaUbicacion('')
        setNumeroPale('')
      })
      .catch(error => {
        setModalVisible(true)
        setModalMessage("El numero de pale no existe");
        setNuevaUbicacion('')
        setNumeroPale('')
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

        {/* MODAL */}
        <div className={`fixed inset-0 flex items-center justify-center  bg-opacity-50 ${modalVisible ? 'transition-transform duration-300 ease-out transform translate-y-0' : 'transition-transform duration-300 ease-in transform -translate-y-full'}`}>
              <div className="p-8 bg-cream rounded-md shadow-md  border-hover-but border-2">
          <p className="text-lg font-bold mb-4">{modalMessage}</p>
          <button
            onClick={() => setModalVisible(false)}
            className="bg-cdverde text-cream px-4 py-2 rounded-md hover:bg-hover-but focus:outline-none">
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
  
export default Mover;