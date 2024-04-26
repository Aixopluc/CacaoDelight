import React from 'react';

function PaleItem({ pale }) {
  // Determinar la clase CSS para el color de fondo y borde basado en el estado
  let colorClase = '';
  let bordeClase = '';
  let buttonClase = ''; 
  
  if (pale.Estado === 'Por ubicar') {
    buttonClase = 'bg-blue-500';
  } else if (pale.Estado === 'Producción') {

    buttonClase = 'bg-amber-500';
  } else if (pale.Estado === 'Producido') {
    buttonClase = 'bg-green-500';
  }
  
  return (
    <div className="border rounded-xl p-4 mb-4 bg-white shadow-md">
      <div className='flex justify-between items-center'>
        <h1 className='font-bold text-xl'>{pale.Producto}</h1>
        <div className={`border text-white rounded-full px-3 py-1 ${buttonClase}`}>
          <h2>{pale.Estado}</h2>  
        </div>
      </div>

      <div className='flex justify-between my-3 '>
        <h2>Lote: <label className='font-bold ml-1 text-black'>{pale.Lote}</label></h2> 
        <h2>Kg: <label className='font-bold ml-1 text-black'>{pale.Kg}</label></h2> 
        <h2>Ubicación: <label className='font-bold ml-1 text-black'>{pale.Ubicacion}</label></h2> 
      </div>

      <div className='flex'>
        <h2>Número de pale:</h2> <label className='font-bold ml-2'>{pale.NumeroDePale}</label>
      </div>

    </div>
  );
}

export default PaleItem;
