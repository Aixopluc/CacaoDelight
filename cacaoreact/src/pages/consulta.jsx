import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/header';
import PaleItem from '../components/paleitem';
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

function Consulta() {
  const [data, setData] = useState([]); // Inicializar el estado como un array vacío
  const [colDefs, setColDefs] = useState([
    { field: "Producto", filter: true, floatingFilter: true, width: 'auto', flex: 1 },
    { field: "Kg", filter: true, floatingFilter: true, width: 'auto' ,flex:1},
    { field: "Lote", filter: true, floatingFilter: true, width: 'auto',flex:1},
    { field: "NumeroDePale", filter: true, floatingFilter: true, width: 'auto',flex:1 },
    { field: "Estado", filter: true, floatingFilter: true, width: 'auto' ,flex:1},
    { field: "Ubicacion", filter: true, floatingFilter: true, width: 'auto' ,flex:1}
  ]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/pales');
        setData(response.data); // Almacenar los datos como el array recibido
      } catch (error) {
        console.error('Error fetching data:', error);
      }

      console.log(data)
    };

    fetchData();
  }, []);
  
  const getRowStyle = (params) => {
    if (params.node.rowIndex % 2 === 0) { // Alternar colores para filas pares e impares
      return { background: '#EDF4FE' }; // Color de fila para pares
    }
    return { background: '#DCE9FD' }; // Color de fila para impares
  };
  
  return (
    <div>
      <Header back={true} />

      <div className='flex justify-center'>
        <div className="ag-theme-quartz  w-[90%]" style={{ height: '100vh' }}>
          <AgGridReact rowData={data.pales} columnDefs={colDefs} domLayout="autoHeight" getRowStyle={getRowStyle} pagination={true} // Habilita la paginación
            paginationPageSize={15}  />
        </div>
      </div>
    </div>
  );
}

export default Consulta;
