import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/header';
import PaleItem from '../components/paleitem';

function Consulta() {
  const [data, setData] = useState([]);
  const [numeroPale, setNumeroPale] = useState('');
  const [kg, setKg] = useState('');
  const [lote, setLote] = useState('');
  const [ubicacion, setUbicacion] = useState('');
  const [estado, setEstado] = useState('');
  const [producto, setProducto] = useState('');
  const [error, setError] = useState(null);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      let url = 'http://localhost:8080/pales';
      const params = new URLSearchParams();

      if (numeroPale) params.append('numeroPale', numeroPale);
      if (kg) params.append('kg', kg);
      if (lote) params.append('lote', lote);
      if (ubicacion) params.append('ubicacion', ubicacion);
      if (estado) params.append('estado', estado);
      if (producto) params.append('producto', producto);

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      console.log("URL de solicitud:", url);

      const response = await axios.get(url);
      console.log("Respuesta de la API:", response.data);
      setData(response.data);
      setFilteredData(response.data.pales); // Establecer los datos filtrados
      setError(null);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error);
    }
  };

  const applyFilters = () => {
    const filteredPales = data.pales.filter(pale => {
      const matchNumeroPale = !numeroPale || pale.numeroPale?.includes(numeroPale);
      const matchKg = !kg || pale.kg?.includes(kg);
      const matchLote = !lote || pale.lote?.includes(lote);
      const matchUbicacion = !ubicacion || pale.ubicacion?.includes(ubicacion);
      const matchEstado = !estado || pale.estado?.includes(estado);
      const matchProducto = !producto || pale.producto?.includes(producto);
  
      return matchNumeroPale && matchKg && matchLote && matchUbicacion && matchEstado && matchProducto;
    });
  
    setFilteredData(filteredPales);
  };
  

  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="container mx-auto w-[400px]">
        <Header back={true} />
        <input
          type="text"
          placeholder="Número de Pale"
          value={numeroPale}
          onChange={(e) => setNumeroPale(e.target.value)}
        />
        <input
          type="text"
          placeholder="Kg"
          value={kg}
          onChange={(e) => setKg(e.target.value)}
        />
        <input
          type="text"
          placeholder="Lote"
          value={lote}
          onChange={(e) => setLote(e.target.value)}
        />
        <input
          type="text"
          placeholder="Ubicación"
          value={ubicacion}
          onChange={(e) => setUbicacion(e.target.value)}
        />
        <input
          type="text"
          placeholder="Estado"
          value={estado}
          onChange={(e) => setEstado(e.target.value)}
        />
        <input
          type="text"
          placeholder="Producto"
          value={producto}
          onChange={(e) => setProducto(e.target.value)}
        />
        <button onClick={applyFilters}>Aplicar Filtros</button>
        {error && <div>Error: {error.message}</div>}
        {filteredData && filteredData.map((pale, index) => (
          <div key={index}>
            <PaleItem pale={pale} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Consulta;
