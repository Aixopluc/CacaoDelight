import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/header';
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import CustomCheckbox from '../components/CustomCheckbox';

function GestionarSalida() {
  const [data, setData] = useState([]);
  const [gridApi, setGridApi] = useState(null);
  const [selectedPales, setSelectedPales] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const gridOptions = {
    columnDefs: [
      { 
        headerCheckboxSelection: true, 
        checkboxSelection: (params) => params.data.Estado !== "Expedir" && params.data.Estado !== "Bloqueado", 
        suppressToolPanel: true,
        width: 40 
      }, 
      { field: "Producto", filter: true, floatingFilter: true, width: 'auto', flex: 1 },
      { field: "Kg", filter: true, floatingFilter: true, width: 'auto' ,flex: 1},
      { field: "Lote", filter: true, floatingFilter: true, width: 'auto', flex: 1},
      { field: "NumeroDePale", filter: true, floatingFilter: true, width: 'auto', flex: 1 },
      { field: "Estado", filter: true, floatingFilter: true, width: 'auto' , flex: 1},
      { field: "Ubicacion", filter: true, floatingFilter: true, width: 'auto' , flex: 1},
      { field: "Expedido", hide: true }
    ],
    rowSelection: 'multiple', 
    rowMultiSelectWithClick: true, 
    enableRangeSelection: true,
    enableCellTextSelection: true,
    clipboardDeliminator: '\t',
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/pales/getAll');
      setData(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const getRowStyle = (params) => {
    if (params.data && params.data.Estado === "Expedir") {
      return { background: '#b3ddb7' }; 
    } else if (params.data && params.data.Estado === "Producción"){
      return { background: '#a2dcdc' };
    } else if(params.data && params.data.Estado === "Bloqueado"){
      return{background: '#FF8080'}
    } else {
      if (params.node.rowIndex % 2 === 0) {
        return { background: '#faf8f5' }; 
      }
      return { background: '#f1e6d5' }; 
    }
  };

  const onGridReady = (params) => {
    setGridApi(params.api); 
  };

  const generarSalida = async () => {
    try {
      const selectedNodes = gridApi.getSelectedNodes();
      const selectedPales = selectedNodes
        .filter(node => node.data.Estado !== "Expedir" && node.data.Estado !== "Bloqueado")
        .map(node => node.data.NumeroDePale);
  
      if (selectedPales.length > 0) {
        const respuesta = await axios.post('http://localhost:8080/pales/exp', selectedPales);
        console.log(respuesta);
        setSelectedPales([]);
        gridApi.deselectAll();
        fetchData();
      } else {
        console.log("No se pueden seleccionar elementos en estado 'Expedir' o 'Bloqueado'.");
      }
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };

  return (
    <div className='w-[90%] m-auto '>
      <Header back={true} />
      <div className=' '>
        <div className="ag-theme-quartz w-[100%]" style={{ height: '' }}>
          <AgGridReact
            rowData={data.pales}
            gridOptions={gridOptions}
            domLayout="autoHeight"
            getRowStyle={getRowStyle}
            pagination={true}
            paginationPageSize={15} 
            onGridReady={onGridReady} 
          />
        </div>
        <div className='flex justify-center'>
          <button className='bg-cream py-5 px-8 rounded-lg my-3 font-bold hover:bg-hover-but text-cdverde' onClick={generarSalida}>Generar salida</button>
        </div>
      </div>
      {showModal && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-8">
            <p className="text-lg font-bold">Se ha generado la salida correctamente</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default GestionarSalida;
