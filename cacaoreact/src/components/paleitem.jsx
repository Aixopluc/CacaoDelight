import React from 'react';

function PaleItem({ pale }) {
  return (
    <div className="border border-gray-300 rounded-md p-4 mb-4 shadow-md bg-gray-100">
      <h2 className="text-lg font-semibold mb-2">Pale Details</h2>
      <div>
        <p><strong>Numero de pale:</strong> {pale.NumeroDePale}</p>
        <p><strong>Kg:</strong> {pale.Kg}</p>
        <p><strong>Lote:</strong> {pale.Lote}</p>
        <p><strong>Ubicacion:</strong> {pale.Ubicacion}</p>
        <p><strong>Estado:</strong> {pale.Estado}</p>
        <p><strong>Producto:</strong> {pale.Producto}</p>
      </div>
    </div>
  );
}

export default PaleItem;