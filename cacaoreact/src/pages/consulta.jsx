import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../components/header';
import { AgGridReact } from 'ag-grid-react'; // AG Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import EditIcon from '../components/editIcon';
import {XMarkIcon, MapIcon} from '@heroicons/react/24/solid'

function Consulta() {
  const [data, setData] = useState([]); // Inicializar el estado como un array vacío
  const [gridApi, setGridApi] = useState(null); // Nuevo estado para almacenar la API de AG Grid
  const [paleToEdit, setPaleToEdit] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const gridOptions = {
    columnDefs: [
      { field: "Producto", filter: true, floatingFilter: true, width: 'auto', flex: 1, resizable: false },
      { field: "Kg", filter: true, floatingFilter: true, width: 'auto' ,flex:1, resizable: false},
      { field: "Lote", filter: true, floatingFilter: true, width: 'auto',flex:1, resizable: false},
      { field: "NumeroDePale", filter: true, floatingFilter: true, width: 'auto',flex:1, resizable: false },
      { field: "Estado", filter: true, floatingFilter: true, width: 'auto' ,flex:1, resizable: false},
      { field: "Ubicacion", filter: true, floatingFilter: true, width: 'auto' ,flex:1, resizable: false},
      { field: "Expedido", hide: true },
      { 
        field: "actions",
        headerName: "",
        cellRenderer: (params) => <EditIcon rowData={params.data} handleRowButtonClick={handleRowButtonClick} />,
        width: 60,
        resizable: false,
        suppressSizeToFit: true
      }
    ],
  
    enableRangeSelection: true,
    enableCellTextSelection: true,
    clipboardDeliminator: '\t', // Tab as delimiter for copied data
  };
  const handleRowButtonClick = async (rowData) => {
    try{
      const response = await axios.get(`http://localhost:8080/pale/getOneId/${rowData.ID}`);
      console.log(response.data.pales)
      setPaleToEdit(response.data.pales)
      setShowModal(true);
    }catch(error){
      console.error('Error fetching data', error)
    }
  };

  const closeModal = () => {
    setShowModal(false);
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


  const enviarDatosPale = async () => {
    try {
      const datosPale = {
        ...paleToEdit,
        Kg: parseFloat(paleToEdit.Kg),
        NumeroDePale: parseInt(paleToEdit.NumeroDePale)
      };
      const respuesta = await axios.post(`http://localhost:8080/pale/upd/${paleToEdit.ID}`, datosPale);
      if (respuesta.status == 200){
        fetchData()
        setShowModal(false)
      }
    
    } catch (error) {
      console.log("ERROR AL ACTUALIZAR LOS DATOS", error);
    }
  };
  

  const deletePale = async () => {
    try{
      const respuesta = await axios.delete(`http://localhost:8080/delete/${paleToEdit.ID}`);
      if (respuesta.status == 200){
        console.log("Pale eliminado con exito")
        fetchData()
        setShowModal(false)
      }
    }catch(error){
      console.error("ERROR AL ELIMINAR LOS DATOS", error)
    }
  }

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

     
      <div className={`fixed inset-0 flex items-center justify-center bg-black bg-opacity-90 ${showModal ? 'transition-transform duration-300 ease-out transform translate-y-0' : 'transition-transform duration-300 ease-in transform -translate-y-full'}`}>
          <div className="bg-cdverde p-8 rounded-lg shadow-xl max-w-[400px] w-[400px]">
            <div className='flex justify-end'>
              <button className='mb-3'  onClick={closeModal}>
                <XMarkIcon  className="h-8 w-8 text-cream hover:rotate-90 transition-transform duration-300 hover:cursor-pointer"/>
              </button>
            </div>

            <p className="text-2xl font-bold mb-4 text-cream">MODIFICAR PRODUCTO</p>
              <div className='mb-4'>
                <label htmlFor="producto" className="block mb-1 text-cream text-left ml-4">Producto:</label>
                  <select
                    id="producto"
                    name="Producto"
                    value={paleToEdit.Producto}
                    onChange={(event) => setPaleToEdit({ ...paleToEdit, Producto: event.target.value })}
                    className="w-11/12 px-3 py-3 border-2 border-cream rounded-md shadow-sm focus:outline-none bg-grisin text-cdverde">
                    <option value="Producto 1">Producto 1</option>
                    <option value="Producto 2">Producto 2</option>
                    <option value="Producto 3">Producto 3</option>
                  </select>
              </div>

              <div className="mb-4">
                <label htmlFor="kg" className="block mb-1 text-cream text-left ml-4">Kg:</label>
                <input
                  type="text"
                  id="kg"
                  name="Kg"
                  value={paleToEdit.Kg}
                  onChange={(event) => setPaleToEdit({ ...paleToEdit, Kg: event.target.value })}
                  className="w-11/12 px-3 py-2 border-2 border-cream rounded-md shadow-sm focus:outline-none bg-grisin text-cdverde"/>
              </div>

              <div className="mb-4">
                <label htmlFor="lote" className="block mb-1 text-cream text-left ml-4">Lote:</label>
                <input
                  type="text"
                  id="lote"
                  name="Lote"
                  value={paleToEdit.Lote}
                  onChange={(event) => setPaleToEdit({ ...paleToEdit, Lote: event.target.value })}
                  className="w-11/12 px-3 py-2 border-2 border-cream rounded-md shadow-sm focus:outline-none bg-grisin text-cdverde"/>
              </div>

              <div className="mb-4">
                <label htmlFor="estado" className="block mb-1 text-cream text-left ml-4">Estado:</label>
                <select
                  type="text"
                  name="Estado"
                  id="estado"
                  value={paleToEdit.Estado}
                  onChange={(event) => setPaleToEdit({ ...paleToEdit, Estado: event.target.value })}
                  className="w-11/12 px-3 py-3 border-2 border-cream rounded-md shadow-sm focus:outline-none bg-grisin text-cdverde">
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
                  value={paleToEdit.NumeroDePale}
                  onChange={(event) => setPaleToEdit({ ...paleToEdit, NumeroDePale: event.target.value })}
                  className="w-11/12 px-3 py-2 border-2 border-cream rounded-md shadow-sm focus:outline-none bg-grisin text-cdverde"/>
              </div>

              <div className="flex justify-evenly items-center">
              <button
                onClick={enviarDatosPale}
                className="bg-cream text-cdverde px-4 py-2 rounded-md hover:bg-hover-but focus:outline-none focus:bg-blue-600">
                Modificar
              </button>
              <button
                 onClick={deletePale}
                className="bg-[#fc4e4e] text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:bg-red-600">
                Eliminar
              </button>
            </div>
          </div>
        </div>

    </div>
  );
}

export default Consulta;