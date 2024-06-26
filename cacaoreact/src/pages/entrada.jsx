import Header from '../components/header';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';
import Footer from '../components/footer';
import UploadPaleCSV from '../components/UploadPaleCSV';

function Entrada() {
  const [pale, setPale] = useState({
    NumeroDePale: '',
    Kg: '',
    Lote: '',
    Ubicacion: 'Antecamara',
    Estado: 'Por ubicar',
    Expedido: false,
    Producto: 'Producto 1',
    Cantidad: ''
  });

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalCsvVisible, setModaCsvlVisible] = useState(false);

  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Por favor seleccione un archivo');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:8080/pales/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': token
        }
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error al subir el archivo');
      console.error('Error al subir el archivo:', error);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPale({
      ...pale,
      [name]: value
    });
  };

  const validarCampos = () => {
    const { NumeroDePale, Kg, Lote, Producto } = pale;
    return NumeroDePale && Kg && Lote && Producto;
  };

  const enviarDatosPale = async () => {
    if (!validarCampos()) {
      setModalMessage('Rellena todos los campos!');
      setModalVisible(true);
      return;
    }

    try {
      const datosPale = {
        ...pale,
        Cantidad: parseInt(pale.Cantidad),
        Kg: parseFloat(pale.Kg)*(pale.Cantidad),
        NumeroDePale: parseInt(pale.NumeroDePale)
      };
      const token = localStorage.getItem('token');
      const respuesta = await axios.post('http://localhost:8080/pale/create', datosPale, {
        headers: {
          Authorization: token // Establece el token en el encabezado de autorización
        }
      });

      console.log("Respuesta del servidor", respuesta);
      setModalMessage('¡Pale añadido exitosamente!');
      setModalVisible(true);

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
      setTimeout(() => {
        setModalVisible(false);
      }, 1000);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setModalMessage('El número de pale ya existe');
      } else {
        setModalMessage(`Error al enviar los datos: ${error.response ? error.response.statusText : error.message}`);
      }
      setModalVisible(true);
      console.error('Error al enviar los datos:', error);
    }
  };

  return (
    <div className="bg-cdverde min-h-screen">
      <div className="container mx-auto max-w-[400px]">
        <Header back={true} />
        <p className="text-2xl font-bold mb-4 text-cream">ENTRADA DE PRODUCTO</p>
        <div className="mb-4">
          <label htmlFor="producto" className="block mb-1 text-cream text-left ml-4">Producto</label>
          <select
            id="producto"
            name="Producto"
            value={pale.Producto}
            onChange={handleInputChange}
            className="w-11/12 px-3 py-2 border-2 border-cream rounded-md shadow-sm focus:outline-none bg-grisin text-cdverde"
            required
          >
            <option value="Producto 1">Producto 1</option>
            <option value="Producto 2">Producto 2</option>
            <option value="Producto 3">Producto 3</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="kg" className="block mb-1 text-cream text-left ml-4">Kg por unidad</label>
          <input
            type="text"
            id="kg"
            name="Kg"
            value={pale.Kg}
            onChange={handleInputChange}
            className="w-11/12 px-3 py-2 border-2 border-cream rounded-md shadow-sm focus:outline-none bg-grisin text-cdverde"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="cantidad" className="block mb-1 text-cream text-left ml-4">Cantidad</label>
          <input
            type="text"
            id="cantidad"
            name="Cantidad"
            value={pale.Cantidad}
            onChange={handleInputChange}
            className="w-11/12 px-3 py-2 border-2 border-cream rounded-md shadow-sm focus:outline-none bg-grisin text-cdverde"
            required
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
            className="w-11/12 px-3 py-2 border-2 border-cream rounded-md shadow-sm focus:outline-none bg-grisin text-cdverde"
            required
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
            className="w-11/12 px-3 py-2 border-2 border-cream rounded-md shadow-sm focus:outline-none bg-grisin text-cdverde"
            required
          />
        </div>
        <div className="justify-between items-center">
          <button
            onClick={enviarDatosPale}
            className="text-cdverde px-4 py-3 rounded-lg mt-6 focus:outline-none bg-cream w-11/12 font-bold hover:bg-hover-but"
          >
            Añadir
          </button>
        </div>

        <div className="justify-between items-center">
          <button
            onClick={() => setModaCsvlVisible(true)}
            className="text-cdverde px-4 py-3 rounded-lg mt-5 focus:outline-none bg-cream w-11/12 font-bold hover:bg-hover-but"
          >
            Añadir CSV
          </button>
        </div>
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

      <div className={`fixed inset-0 flex items-center justify-center  bg-opacity-50 ${modalCsvVisible ? 'transition-transform duration-300 ease-out transform translate-y-0' : 'transition-transform duration-300 ease-in transform -translate-y-full'}`}>
        <div className="p-8 bg-cream rounded-md shadow-md  border-hover-but border-2">
          <h1>Subir archivo CSV</h1>
          <div className='mt-3'>
            <div className='flex justify-center'>
              <input type="file" accept=".csv" onChange={handleFileChange} />
            </div>
            
            {message && <p className='mt-2'>{message}</p>}
            <div className='my-3 flex justify-around'>
              <button className='bg-cdverde text-cream px-4 py-2 rounded-md hover:bg-hover-but focus:outline-none' onClick={handleUpload}>Subir</button>
              <button onClick={() => setModaCsvlVisible(false)} className="bg-cdverde text-cream px-4 py-2 rounded-md hover:bg-hover-but focus:outline-none">
                Cerrar
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Entrada;
