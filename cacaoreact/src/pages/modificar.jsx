import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import axios from 'axios';

const ConfirmacionModal = ({ mostrar, cerrarModal, confirmarEliminacion }) => {
  return (
    <div className={`fixed inset-0 flex items-center justify-center ${mostrar ? '' : 'hidden'}`}>
      <div className="absolute bg-gray-900 opacity-50 inset-0"></div>
      <div className="bg-white p-8 rounded-lg z-10">
        <p className="mb-4">¿Estás seguro de eliminar este pale?</p>
        <div className="flex justify-center">
          <button
            onClick={cerrarModal}
            className="mr-4 bg-gray-300 hover:bg-gray-400 px-4 py-2 rounded-md"
          >
            Cancelar
          </button>
          <button
            onClick={confirmarEliminacion}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md "
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

function Modificar() {
  const [numeroPale, setNumeroPale] = useState('');
  const [mostrarInput, setMostrarInput] = useState(true);
  const [leido, setLeido] = useState(false);
  const [pale, setPale] = useState({
    Producto: '',
    Kg: '',
    Lote: '',
    NumeroDePale: '',
    Estado: '',
    Expedido: false,
    Ubicaccion: ''
  });
  const [mostrarModal, setMostrarModal] = useState(false);

  useEffect(() => {
     console.log("HOla he cambiado",pale)
  }, [pale]);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setNumeroPale(value);
  };

  const recibirDatosPale = async () => {
    try {
      const respuesta = await axios.get(`http://localhost:8080/pale/${numeroPale}`);
      console.log("Console log de la respuesta",respuesta.data.pale);

      setLeido(true);
      setPale(respuesta.data.pales);
    } 
    catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };

  const enviarDatosPale = async () => {
    try {
      const datosPale = {
        ...pale,
        Kg: parseFloat(pale.Kg),
        NumeroDePale: parseInt(pale.NumeroDePale)
      };
      const respuesta = await axios.post(`http://localhost:8080/pales/${pale.ID}`, datosPale ) 

      setLeido(false)
      setPale({
        Producto: '',
        Kg: '',
        Lote: '',
        NumeroDePale: '',
        Estado: '',
        Expedido: false,
        Ubicaccion: ''
      });
      setNumeroPale('');
    }
    catch (error){
      console.log("ERROR AL ACTUALIZAR LOS DATOS", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    recibirDatosPale();
  };

  const abrirModal = () => {
    setMostrarModal(true);
  };

  const cerrarModal = () => {
    setMostrarModal(false);
  };

  const confirmarEliminacion = () => {
    // Aquí puedes colocar la lógica para eliminar el pale
    // Por ahora, simplemente cerramos el modal
    cerrarModal();
  };

  return (
    <div className="bg-cdverde min-h-screen">
      <div className="container mx-auto w-[400px]">
        <Header back={true} />
        <p className="text-2xl font-bold mb-4 text-cream">MODIFICAR PRODUCTO</p>

        {leido && pale.NumeroDePale !== 0 ? (
          <div>
            <div className="mb-4">
              <label htmlFor="producto" className="block mb-1 text-cream text-left ml-4">Producto:</label>
              <select
                id="producto"
                name="Producto"
                value={pale.Producto}
                onChange={(event) => setPale({ ...pale, Producto: event.target.value })}
                className="w-11/12 px-3 py-3 border border-cream rounded-lg shadow-sm focus:outline-none focus:border-blue-500 bg-grisin"
              >
                <option value="0">Seleccionar producto</option>
                <option value="Producto 1">Producto 1</option>
                <option value="Producto 2">Producto 2</option>
                <option value="Producto 3">Producto 3</option>
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="kg" className="block mb-1 text-cream text-left ml-4">Kilogramos (kg):</label>
              <input
                type="text"
                id="kg"
                name="Kg"
                value={pale.Kg}
                onChange={(event) => setPale({ ...pale, Kg: event.target.value })}
                className="w-11/12 px-3 py-3 border border-cream rounded-lg shadow-sm focus:outline-none focus:border-blue-500 bg-grisin"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="lote" className="block mb-1 text-cream text-left ml-4">Lote:</label>
              <input
                type="text"
                id="lote"
                name="Lote"
                value={pale.Lote}
                onChange={(event) => setPale({ ...pale, Lote: event.target.value })}
                className="w-11/12 px-3 py-3 border border-cream rounded-lg shadow-sm focus:outline-none focus:border-blue-500 bg-grisin"
              />
            </div>


            <div className="mb-4">
              <label htmlFor="estado" className="block mb-1 text-cream text-left ml-4">Estado:</label>
              <select
                type="text"
                name="Estado"
                id="estado"
                value={pale.Estado}
                onChange={(event) => setPale({ ...pale, Estado: event.target.value })}
                className="w-11/12 px-3 py-3 border border-cream rounded-lg shadow-sm focus:outline-none focus:border-blue-500 bg-grisin"
              >
                <option value="0">Seleccionar estado</option>
                <option value="Por ubicar">Por ubicar</option>
                <option value="Producción">Producción</option>
                <option value="Expedir">Expedir</option>
                <option value="Bloqueado">Bloqueado</option>
              </select>
            </div> 
            <div className="mb-4">
              <label htmlFor="numeroEtiqueta" className="block mb-1 text-cream text-left ml-4">Número de etiqueta:</label>
              <input
                type="text"
                name="NumeroDePale"
                id="numeroEtiqueta"
                value={pale.NumeroDePale}
                onChange={(event) => setPale({ ...pale, NumeroDePale: event.target.value })}
                className="w-11/12 px-3 py-3 border border-cream rounded-lg shadow-sm focus:outline-none focus:border-blue-500 bg-grisin"
              />
            </div>
            <div className="flex justify-evenly items-center">
              <button
                onClick={enviarDatosPale}
                className="bg-cream text-cdverde px-4 py-2 rounded-md hover:bg-hover-but focus:outline-none focus:bg-blue-600"
              >
                Modificar
              </button>
              <button
                onClick={abrirModal}
                className="bg-[#fc4e4e] text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600"
              >
                Eliminar
              </button>
            </div>
          </div>

        ) : (
          <div>
            <form onSubmit={handleSubmit}>
              {mostrarInput && (
                <div className="mb-4">
                  <label htmlFor="numeroPale" className="block mb-1 text-cream">Numero de pale:</label>
                  <input
                    type="text"
                    id="numeroPale"
                    name="NumeroPale"
                    value={numeroPale}
                    onChange={handleInputChange}
                    className="w-11/12 px-3 py-2 border-2 border-cream rounded-md shadow-sm focus:outline-none bg-grisin text-cdverde"
          
                  />
                </div>
              )}
              
              <button type="submit" className="bg-cream text-cdverde  px-4 py-2 rounded-md">
                Verificar
              </button>
            </form>

          </div>
        )}
        <ConfirmacionModal
          mostrar={mostrarModal}
          cerrarModal={cerrarModal}
          confirmarEliminacion={confirmarEliminacion}
        />
      </div>
    </div>
  );
}

export default Modificar;