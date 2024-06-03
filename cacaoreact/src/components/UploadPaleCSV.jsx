import React, { useState } from 'react';
import axios from 'axios';

const UploadPaleCSV = () => {
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
      //setMessage(response.data.message);
    } catch (error) {
      setMessage('Error al subir el archivo');
      console.error('Error al subir el archivo:', error);
    }
  };

  return (
    <div>
      <h1>Subir archivo CSV de Pales</h1>
      <input type="file" accept=".csv" onChange={handleFileChange} />
      <button onClick={handleUpload}>Subir</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UploadPaleCSV;
