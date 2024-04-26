import Header from '../components/header';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import Footer from '../components/footer';

function Entrada() {
  const [pale, setPale] = useState({
    NumeroDePale: '',
    Kg: '',
    Lote: '',
    Ubicacion: 'Antecamara',
    Estado: 'Por ubicar',
    Expedido: false,
    Producto: ''
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPale({
      ...pale,
      [name]: value
    });
  }

  const enviarDatosPale = async () => {
    try {
      const datosPale = {
        ...pale,
        Kg: parseFloat(pale.Kg),
        NumeroDePale: parseInt(pale.NumeroDePale)
      };

      const respuesta = await axios.post('http://localhost:8080/pales', datosPale);
      console.log(respuesta.data);
      setModalMessage('¡Pale añadido exitosamente!');
      setModalVisible(true);
      setPale({
        ...pale,
        NumeroDePale: '',
        Kg: '',
        Lote: '',
        Producto: ''
      });

      // Cerrar el modal después de 5 segundos
      setTimeout(() => {
        setModalVisible(false);
      }, 1000);
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  }

  return (
    <div className="bg-cdverde  min-h-screen"> 
      <div className="container mx-auto w-[400px]">
        <Header back={true} />
        <p className="text-2xl font-bold mb-4 text-cream">ENTRADA DE PRODUCTO</p>
        <div className="mb-4">
          <label htmlFor="producto" className="block mb-1 text-cream text-left ml-4">Producto</label>
          <select
            id="producto"
            name="Producto"
            value={pale.Producto}
            onChange={handleInputChange}
            className="w-11/12 px-3 py-3 border border-cream rounded-lg shadow-sm focus:outline-none focus:border-blue-500 bg-grisin"
          >
            <option value="0">Seleccionar producto</option>
            <option value="Producto 1">Producto 1</option>
            <option value="Producto 2">Producto 2</option>
            <option value="Producto 3">Producto 3</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="kg" className="block mb-1 text-cream text-left ml-4">Kg</label>
          <input
            type="text"
            id="kg"
            name="Kg"
            value={pale.Kg}
            onChange={handleInputChange}
            className="px-3 w-11/12 py-3 border border-cream rounded-lg shadow-sm focus:outline-none focus:border-blue-500 bg-grisin"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lote" className="block mb-1 text-cream text-left ml-4">Lote</label>
          <input
            type="text"
            id="lote"
            name="Lote"
            value={pale.Lote}
            onChange={handleInputChange}
            className="w-11/12 px-3 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-blue-500 bg-grisin"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="numeroEtiqueta" className="block mb-1 text-cream text-left ml-4">Número de etiqueta</label>
          <input
            type="text"
            name="NumeroDePale"
            id="numeroEtiqueta"
            value={pale.NumeroDePale}
            onChange={handleInputChange}
            className="w-11/12 px-3 py-3 border border-cream rounded-lg shadow-sm focus:outline-none focus:border-blue-500 bg-grisin"
          />
        </div>
        <div className=" justify-between items-center">
          <button
            onClick={enviarDatosPale}
            className=" text-cdverde px-4 py-3 rounded-lg mt-10 focus:outline-none bg-cream w-11/12 font-bold hover:bg-hover-but">
            Añadir
          </button>
        </div>
      </div>
      {modalVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="bg-white p-8 rounded-md shadow-md">
            <p className="text-lg font-bold mb-4">{modalMessage}</p>
            <button
              onClick={() => setModalVisible(false)}
              className="bg-blue-500 text-green-800 px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Cerrar
            </button>
          </div>
          
        </div>
      )}
      <Footer />
    </div>
  );
}

export default Entrada;
