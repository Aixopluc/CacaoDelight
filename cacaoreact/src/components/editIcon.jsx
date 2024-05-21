// Dentro de EditIcon.js

import React from 'react';
import { ArrowLeftIcon, BeakerIcon, PencilSquareIcon } from '@heroicons/react/24/solid'

function EditIcon(props) {
  const { rowData, handleRowButtonClick } = props;

  const handleClick = () => {
    handleRowButtonClick(rowData);
  };

  return (
    <div className='hover:cursor-pointer justify-center'>
        <PencilSquareIcon onClick={handleClick} />
      
    </div>
  );
}

export default EditIcon;
