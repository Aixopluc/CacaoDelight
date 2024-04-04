
import Header from '../components/header';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';


function Entrada() {

// Estado para almacenar los datos del formulario
    const [pale, setPale] = useState({
      NumeroDePale: '',
      Kg: '',
      Lote: '',
      Ubicacion: 'Antecamara',
      Estado: 'Por ubicar',
      Expedido: false,
      Producto: ''
    });

    // Función para manejar el cambio en los inputs del formulario
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setPale({
        ...pale,
        [name]: value
      });
    }

    // Función para enviar los datos del formulario al backend
    const enviarDatosPale = async () => {
      try {
        // Convertir campos relevantes a los tipos de datos correctos
        const datosPale = {
          ...pale,
          Kg: parseFloat(pale.Kg),
          NumeroDePale: parseInt(pale.NumeroDePale)
        };

        // Enviar solicitud POST con los datos actualizados
        const respuesta = await axios.post('http://localhost:8080/pales', datosPale);
        console.log(respuesta.data); // Puedes mostrar un mensaje de éxito o hacer algo más con la respuesta
        setPale({
          ...pale,
          NumeroDePale: '',
          Kg: '',
          Lote: '',
          Producto: ''
        });
      } catch (error) {
        console.error('Error al enviar los datos:', error);
      }
    }



  return (
    <div className="bg-gray-200 min-h-screen">

      <div className="container mx-auto w-[400px]">
      <Header back={true} />
        <p className="text-2xl font-bold mb-4">ENTRADA DE PRODUCTO</p>
        <div className="mb-4">
          <label htmlFor="producto" className="block mb-1">Producto:</label>
          <select
            id="producto"
            name="Producto" // Aquí se corrigió el nombre del atributo
            value={pale.Producto} // Aquí se corrigió el nombre del atributo
            onChange={handleInputChange}
            className="w-11/12 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
          >
            <option value="0">Seleccionar producto</option>
            <option value="Producto 1">Producto 1</option>
            <option value="Producto 2">Producto 2</option>
            <option value="Producto 3">Producto 3</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="kg" className="block mb-1">Kilogramos (kg):</label>
          <input
            type="text"
            id="kg"
            name="Kg"
            value={pale.Kg}
            onChange={handleInputChange}
            className="px-3 w-11/12 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="lote" className="block mb-1">Lote:</label>
          <input
            type="text"
            id="lote"
            name="Lote"
            value={pale.Lote}
            onChange={handleInputChange}
            className="w-11/12 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="numeroEtiqueta" className="block mb-1">Número de etiqueta:</label>
          <input
            type="text"
            name="NumeroDePale"
            id="numeroEtiqueta"
            value={pale.NumeroDePale}
            onChange={handleInputChange}
            className="w-11/12 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
          />
        </div>
        <div className=" justify-between items-center">
          <button
            onClick={enviarDatosPale}
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
