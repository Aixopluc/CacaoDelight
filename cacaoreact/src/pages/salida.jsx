import { Link } from 'react-router-dom';
import Header from '../components/header';
import React, { useState, useEffect } from 'react';
import axios from 'axios';


function Salida() {
  const [data, setData] = useState([]); // Inicializar el estado como un array vacío

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/palesexp');
        setData(response.data); // Almacenar los datos como el array recibido
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);



  return (
    <div>
      <div className="bg-cdverde  min-h-screen"> 
        <div className="container mx-auto w-[400px]">
          <Header back={true} />
          <p className="text-2xl font-bold mb-4 text-cream">SALIDA DE PRODUCTO</p>
        </div>
      </div>
    </div>
  );
}

export default Salida;