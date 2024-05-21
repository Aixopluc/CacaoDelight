import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../img/logoCD.png';

function Footer() {
  return (
    <div className="flex justify-center items-center h-full" style={{ marginTop: '40px' }}>
      {/* Envuelve el logo con un Link */}
      <Link to="/">
        <img src={Logo} alt="Logo" className="w-30 h-28 mx-auto my-auto" />
      </Link>
    </div>
  );
}

export default Footer;