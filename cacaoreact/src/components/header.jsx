import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import axios from 'axios';

function Modificar() {
  const [numeroPale, setNumeroPale] = useState('');
  const [mostrarInput, setMostrarInput] = useState(true);
  const [leido, setLeido] = useState(false);
  const [pale, setPale] = useState({
    Producto: '',
    Kg: '',
    Lote: '',
    NumeroDePale: ''
  });

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
    <div className="bg-gray-200 min-h-screen">
      <div className="container mx-auto w-[400px]">
        <Header back={true} />
        <p className="text-2xl font-bold mb-4">MODIFICAR PRODUCTO</p>
  
        {mostrarInput && (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="numeroPale" className="block mb-1">NumeroPale:</label>
              <input
                type="text"
                id="numeroPale"
                name="NumeroPale"
                value={numeroPale}
                onChange={handleInputChange}
                className="px-3 w-11/12 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-blue-500"
              />
            </div>
            
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Verificar
            </button>
          </form>
        )}

        {leido && (
          <div>
            <div className="mb-4">
              <label htmlFor="producto" className="block mb-1">Producto:</label>
              <select
                id="producto"
                name="Producto"
                value={pale.Producto}
                onChange={(event) => setPale({ ...pale, Producto: event.target.value })}
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
                onChange={(event) => setPale({ ...pale, Kg: event.target.value })}
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
                onChange={(event) => setPale({ ...pale, Lote: event.target.value })}
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
                Modificar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Modificar;
