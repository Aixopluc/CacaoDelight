import { Link } from 'react-router-dom';
import Header from '../components/header';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowLeftIcon, ArrowRightIcon } from '@heroicons/react/24/solid'
import Footer from '../components/footer';
function Salida() {
  const [data, setData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/palesexp');
      const responseData = response.data;
      const palesArray = responseData.pales;
      setData(palesArray);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    try {
      fetchData();
    } catch (error) {
      console.error('Error calling fetchData:', error);
    }
  }, []);

  const goToPrevious = () => {
    setCurrentIndex(currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex + 1);
  };

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleUserInput = async () => {
    if (userInput == data[currentIndex].NumeroDePale) {
      try {
        const response = await axios.post(`http://localhost:8080/paleexp/${userInput}`)
        console.log('Respuesta de la llamada POST:', response.data);
        setModalMessage("Pale expedido")
        setShowModal(true)
        fetchData();
      } catch (error) {
        console.error('Error en la llamada POST:', error);
      }
    } else {
      console.log('El número de pale ingresado no coincide con el que se muestra');
      setShowModal(true)
      setModalMessage("El número de pale no coincide")
    }
    setUserInput("")
  };

  return (
    <div className="bg-cdverde min-h-screen">
      <div className="container max-w-[400px] mx-auto">
      <Header back={true} />
      <div className='mx-4'>
        <p className="text-2xl font-bold mb-4 text-cream">SALIDA DE PRODUCTO</p>
        {data.length > 0 && (
          <div key={data[currentIndex].ID} className=" bg-cream rounded-lg p-4 mb-4">
            <div className="flex justify-between mb-2">
              <p className="text-lg font-bold ">Ubicación:</p>
              <p className="text-right">{data[currentIndex].Ubicacion}</p>
            </div>
            <div className="flex justify-between mb-2">
              <p className="text-lg font-bold">Número de Pale:</p>
              <p className="text-right">{data[currentIndex].NumeroDePale}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-lg font-bold">Producto:</p>
              <p className="text-right">{data[currentIndex].Producto}</p>
            </div>

          </div>
        )}
        <div className="flex justify-center mb-4">
          <button onClick={handleUserInput} className="bg-cream hover:bg-hover-but text-cdverde font-bold py-2 px-4 rounded">
            Verificar
          </button>
          
        </div>
        <input type="text" placeholder="Ingrese el número de pale" value={userInput} onChange={handleInputChange} className="mb-4 w-full px-3 py-2 border rounded" />
        <div className="flex justify-between">
          <button onClick={goToPrevious} disabled={currentIndex === 0} className="bg-[#405B70] hover:bg-gray-400 text-white font-bold py-2 px-4 rounded">
           
            <ArrowLeftIcon className="h-6 w-6 text-cream" />
          </button>
          <button onClick={goToNext} disabled={currentIndex === data.length - 1} className="bg-[#405B70] hover:bg-gray-400 text-white font-bold py-2 px-4 rounded">
          <ArrowRightIcon className="h-6 w-6 text-cream" />
          </button>
          </div>
        </div>
      </div>

      <Footer />

      {/* MODAL */}

      <div className={`fixed inset-0 flex items-center justify-center  bg-opacity-50 ${showModal ? 'transition-transform duration-300 ease-out transform translate-y-0' : 'transition-transform duration-300 ease-in transform -translate-y-full'}`}>
        <div className="p-8 bg-cream rounded-md shadow-md  border-hover-but border-2">
            <p className="text-lg font-bold mb-4">{modalMessage}</p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-cdverde text-cream px-4 py-2 rounded-md hover:bg-hover-but focus:outline-none focus:bg-blue-600">
              Cerrar
            </button>
          </div>
      </div>


    </div>
  );
}

export default Salida;
