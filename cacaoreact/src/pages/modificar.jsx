import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/header';
import axios from 'axios';
import Footer from '../components/footer';
import {XMarkIcon, MapIcon} from '@heroicons/react/24/solid';

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
    Cantidad: '',
    Lote: '',
    NumeroDePale: '',
    Estado: '',
    Expedido: false,
    Ubicacion: ''
  });
  const [mostrarModal, setMostrarModal] = useState(false);
  const [mostralModalNoPale, setMostrarModalNoPale] = useState(false);
  let kgTotales = 0;
  
  const calculateKg = (cantidad) => {
    return  cantidad * (pale.Kg / pale.Cantidad) ;
  };

  const [paleNew, setPaleNew] = useState({
    Producto: pale.Producto,
    Kg: '',
    Cantidad: '',
    Lote: pale.Lote,
    NumeroDePale: '',
    Estado: 'Por ubicar',
    Expedido: false,
    Ubicacion: 'Antecamara'
  });
  
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setPaleNew({
      ...paleNew,
      Producto: pale.Producto,
      Lote: pale.Lote,
      Kg: calculateKg(paleNew.Cantidad)
    });
  }, [paleNew]);

  const handleInputChange = (event) => {
    const { value } = event.target;
    setNumeroPale(value);
  };

  const recibirDatosPale = async () => {
    try {
      const token = localStorage.getItem('token');
      const respuesta = await axios.get(`http://localhost:8080/pale/getOneEti/${numeroPale}`, {
        headers: {
          Authorization: token
        }
      });
      console.log("Console log de la respuesta", respuesta.datas);
  
      const paleData = respuesta.data.pales;
      // Calcular los kilogramos divididos por la cantidad
      console.log(paleData.Kg)
      kgTotales = paleData.Kg
      const kgPorUnidad = paleData.Kg / paleData.Cantidad;
      
      // Actualizar el objeto pale con el nuevo valor de kilogramos
      const updatedPaleData = {
        ...paleData,
        Kg: kgPorUnidad  // Puedes agregar una nueva propiedad o reemplazar la existente
      };
  
      setLeido(true);
      setPale(updatedPaleData);
      console.log("UpadtedPale",updatedPaleData.Kg)
      console.log("paleSlo",pale.Kg)
      
      if (respuesta.data.pales.ID == 0) {
        setMostrarModalNoPale(true);
      }
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };
  

  const closeModal = () => {
    setShowModal(false);
    console.log(paleNew)
  };

  const enviarDatosPale = async () => {
    try {
      const datosPale = {
        ...pale,
        Cantidad: parseInt(pale.Cantidad),
        Kg: parseFloat(pale.Kg) * parseInt(pale.Cantidad),
        NumeroDePale: parseInt(pale.NumeroDePale)
      };
      const token = localStorage.getItem('token');
      const respuesta = await axios.post(`http://localhost:8080/pale/upd/${pale.ID}`, datosPale, {
        headers: {
          Authorization: token
        }
      });

      setLeido(false);
      setPale({
        Producto: '',
        Kg: '',
        Lote: '',
        NumeroDePale: '',
        Estado: '',
        Expedido: false,
        Ubicacion: '',
        Cantidad: ''
      });
      setNumeroPale('');
    } catch (error) {
      console.log("ERROR AL ACTUALIZAR LOS DATOS", error);
    }
  };

  const crearPale= async () => {

    try {
      const datosPale = {
        ...paleNew,
        Cantidad: parseInt(paleNew.Cantidad),
        Kg:  parseFloat(pale.Kg) * paleNew.Cantidad,
        NumeroDePale: parseInt(paleNew.NumeroDePale)
      };
      const token = localStorage.getItem('token');
      const respuesta = await axios.post('http://localhost:8080/pale/create', datosPale, {
        headers: {
          Authorization: token // Establece el token en el encabezado de autorización
        }
      });
      if (respuesta.status == 201){
        const pesoCaja = kgTotales / pale.Cantidad
        const unidadesRestantes = pale.Cantidad - paleNew.Cantidad
        const paleUpd = {
          ...pale,
          Cantidad: parseInt(pale.Cantidad - paleNew.Cantidad),
          Kg: parseInt(unidadesRestantes * pale.Kg),
          NumeroDePale: parseInt(pale.NumeroDePale)
        };
        console.log(paleUpd.cantidad)
        const token = localStorage.getItem('token');
        const respuesta = await axios.post(`http://localhost:8080/pale/upd/${pale.ID}`, paleUpd, {
          headers: {
            Authorization: token
          }
        });
      }
      setShowModal(false);
      setLeido(false);

      console.log("Respuesta del servidor", respuesta);
      

      // Limpiar el formulario
      setPale({
        NumeroDePale: '',
        Kg: '',
        Lote: '',
        Ubicacion: 'Antecamara',
        Estado: 'Por ubicar',
        Expedido: false,
        Producto: 'Producto 1',
        Cantidad: ''
      });

      // Cerrar el modal después de 1 segundo
     
    } catch (error) {
      console.error('Error al enviar los datos:', error);
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
    deletePale();
    cerrarModal();
    setLeido(false);
    setNumeroPale("");
  };

  const deletePale = async () => {
    try {
      const token = localStorage.getItem('token');
      const respuesta = await axios.delete(`http://localhost:8080/delete/${pale.ID}`, {
        headers: {
          Authorization: token
        }
      });
      if (respuesta.status === 201) {
        console.log("Pale eliminado con exito");
      }
    } catch (error) {
      console.error("ERROR AL ELIMINAR LOS DATOS", error);
    }
  };

  return (
    <div className="bg-cdverde min-h-screen">
      <div className="container mx-auto max-w-[400px]">
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
                className="w-11/12 px-3 py-2 border-2 border-cream rounded-md shadow-sm focus:outline-none bg-grisin text-cdverde"
              >
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
                className="w-11/12 px-3 py-2 border-2 border-cream rounded-md shadow-sm focus:outline-none bg-grisin text-cdverde"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="cantidad" className="block mb-1 text-cream text-left ml-4">Cantidad:</label>
              <input
                type="text"
                id="cantidad"
                name="Cantidad"
                value={pale.Cantidad}
                onChange={(event) => setPale({ ...pale, Cantidad: event.target.value })}
                className="w-11/12 px-3 py-2 border-2 border-cream rounded-md shadow-sm focus:outline-none bg-grisin text-cdverde"
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
                className="w-11/12 px-3 py-2 border-2 border-cream rounded-md shadow-sm focus:outline-none bg-grisin text-cdverde"
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
                className="w-11/12 px-3 py-2 border-2 border-cream rounded-md shadow-sm focus:outline-none bg-grisin text-cdverde"
              >
                <option value="0">Seleccionar estado</option>
                <option value="Por ubicar">Por ubicar</option>
                <option value="Ubicado">Ubicado</option>
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
                className="w-11/12 px-3 py-2 border-2 border-cream rounded-md shadow-sm focus:outline-none bg-grisin text-cdverde"
              />
            </div>
            <div className="flex justify-evenly items-center">
              <button onClick={() => setShowModal(true)} type="submit" className="bg-cream text-cdverde  px-4 py-2 rounded-md hover:bg-hover-but">
                Dividir pale
              </button>
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
            <Footer />
            <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 ${showModal ? 'transition-transform duration-300 ease-out transform translate-y-0' : 'transition-transform duration-300 ease-in transform -translate-y-full'}`}>
              <div className="bg-cdverde p-8 rounded-lg shadow-xl max-w-[400px] w-[400px]">
                <div className='flex justify-end'>
                  <button className='mb-3' onClick={closeModal}>
                    <XMarkIcon className="h-8 w-8 text-cream hover:rotate-90 transition-transform duration-300 hover:cursor-pointer"/>
                  </button>
                </div>
                <p className="text-2xl font-bold mb-4 text-cream">DIVIDIR PALE</p>
                  
                <div className="mb-4">
                  <label htmlFor="cantidad" className="block mb-1 text-cream text-left ml-4">Cantidad:</label>
                  <input
                    type="text"
                    id="cantidad"
                    name="Cantidad"
                    value={paleNew.Cantidad}
                    onChange={(event) => setPaleNew({ ...paleNew, Cantidad: event.target.value })}
                    className="w-11/12 px-3 py-2 border-2 border-cream rounded-md shadow-sm focus:outline-none bg-grisin text-cdverde"/>
                </div>
                <div className="mb-4">
                  <label htmlFor="numeroEtiqueta" className="block mb-1 text-cream text-left ml-4">Número de etiqueta:</label>
                  <input
                    type="text"
                    name="NumeroDePale"
                    id="numeroEtiqueta"
                    value={paleNew.NumeroDePale}
                    onChange={(event) => setPaleNew({ ...paleNew, NumeroDePale: event.target.value })}
                    className="w-11/12 px-3 py-2 border-2 border-cream rounded-md shadow-sm focus:outline-none bg-grisin text-cdverde"/>
                </div>

                <div className="flex justify-evenly items-center">
                  <button
                    onClick={crearPale}
                    className="bg-cream text-cdverde px-4 py-2 rounded-md hover:bg-hover-but focus:outline-none">
                    Modificar
                  </button>
                </div>
              </div>
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
              
              <button type="submit" className="bg-cream text-cdverde  px-4 py-2 rounded-md hover:bg-hover-but">
                Verificar
              </button>
            </form>
            <Footer />
            <div className={`fixed inset-0 flex items-center justify-center bg-opacity-50 ${mostralModalNoPale ? 'transition-transform duration-300 ease-out transform translate-y-0' : 'transition-transform duration-300 ease-in transform -translate-y-full'}`}>
              <div className="p-8 bg-cream rounded-md shadow-md border-hover-but border-2">
                <p className="text-lg font-bold mb-4">Pale no encontrado</p>
                <button
                  onClick={() => setMostrarModalNoPale(false)}
                  className="bg-cdverde text-cream px-4 py-2 rounded-md hover:bg-hover-but focus:outline-none">
                  Cerrar
                </button>
              </div>
            </div>
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