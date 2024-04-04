import React, { useState } from 'react';
import axios from 'axios';

function App() {
  // Estado para almacenar los datos del formulario
  const [formulario, setFormulario] = useState({
    NumeroDePale: '',
    Kg: '',
    Lote: '',
    Ubicacion: '',
    Estado: '',
    Expedido: false,
    Producto: ''
  });

  // Función para manejar el cambio en los inputs del formulario
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormulario({
      ...formulario,
      [name]: value
    });
  }

  // Función para enviar los datos del formulario al backend
  const enviarDatosFormulario = async () => {
    try {
      // Convertir campos relevantes a los tipos de datos correctos
      const datosFormulario = {
        ...formulario,
        Kg: parseFloat(formulario.Kg),
        NumeroDePale: parseInt(formulario.NumeroDePale)
      };
  
      // Enviar solicitud POST con los datos actualizados
      const respuesta = await axios.post('http://localhost:8080/pales', datosFormulario);
      console.log(respuesta.data); // Puedes mostrar un mensaje de éxito o hacer algo más con la respuesta
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Formulario para enviar datos al backend en Go:
        </p>
        <input type="text" name="Producto" value={formulario.Producto} onChange={handleInputChange} placeholder="Producto" />
        <input type="number" name="Kg" value={formulario.Kg} onChange={handleInputChange} placeholder="Kg" />
        <input type="text" name="Lote" value={formulario.Lote} onChange={handleInputChange} placeholder="Lote" />
        <input type="text" name="Ubicacion" value={formulario.Ubicacion} onChange={handleInputChange} placeholder="Ubicación" />
        <input type="text" name="Estado" value={formulario.Estado} onChange={handleInputChange} placeholder="Estado" />
        <input type="text" name="NumeroDePale" value={formulario.NumeroDePale} onChange={handleInputChange} placeholder="Número de Pale" />
        <button onClick={enviarDatosFormulario}>Enviar datos</button>
      </header>
    </div>
  );
}

export default App;
