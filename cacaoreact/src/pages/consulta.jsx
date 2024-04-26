import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/header';
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

function Consulta() {
  const [data, setData] = useState([]); // Inicializar el estado como un array vacío
  const [gridApi, setGridApi] = useState(null); // Nuevo estado para almacenar la API de AG Grid

  const gridOptions = {
    columnDefs: [
      { field: "Producto", filter: true, floatingFilter: true, width: 'auto', flex: 1 },
      { field: "Kg", filter: true, floatingFilter: true, width: 'auto' ,flex:1},
      { field: "Lote", filter: true, floatingFilter: true, width: 'auto',flex:1},
      { field: "NumeroDePale", filter: true, floatingFilter: true, width: 'auto',flex:1 },
      { field: "Estado", filter: true, floatingFilter: true, width: 'auto' ,flex:1},
      { field: "Ubicacion", filter: true, floatingFilter: true, width: 'auto' ,flex:1},
      { field: "Expedido", hide: true }
    ],
  
    enableRangeSelection: true,
    enableCellTextSelection: true,
    clipboardDeliminator: '\t', // Tab as delimiter for copied data
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/pales');
        setData(response.data); // Almacenar los datos como el array recibido
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const getRowStyle = (params) => {
    if (params.data && params.data.Estado === "Expedir") {
      return { background: '#D2F0D1' }; 
    }else if (params.data && params.data.Estado === "Producción"){
      return { background: '#D1E2F0' };
    }else if(params.data && params.data.Estado === "Bloqueado"){
      return{background: '#FF8080'}
    }else {
      if (params.node.rowIndex % 2 === 0) {
        return { background: '#F9F9EE' }; // Color de fila para pares
      }
      return { background: '#F6F5E2' }; // Color de fila para impares
    }
  };
  const onGridReady = (params) => {
    setGridApi(params.api); // Almacena la API de AG Grid cuando el componente está listo
  };

  return (
    <div className='w-[90%] m-auto '>
      <Header back={true} />
      <div className='flex justify-center'>
        <div className="ag-theme-quartz w-[100%]" style={{ height: '100vh' }}>
          <AgGridReact
            rowData={data.pales}
            gridOptions={gridOptions}
            domLayout="autoHeight"
            getRowStyle={getRowStyle}
            pagination={true} // Habilita la paginación
            paginationPageSize={15} // Define el tamaño de página de la paginación
            onGridReady={onGridReady} // Maneja el evento de que el grid está listo
          />
        </div>
      </div>
    </div>
  );
}

export default Consulta;
