import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/users/create', {
        nombre: usuario,
        contraseña: contraseña,
        rol: 0, // Establece el rol por defecto como 0
      });

      console.log('Registro exitoso:', response.data);
      // Guarda el token en el almacenamiento local o en el contexto global de la aplicación
      localStorage.setItem('token', response.data.token);

      // Redirige al usuario a la página de inicio o a donde desees
      navigate('/');
    } catch (error) {
      console.error('Registro fallido:', error.response ? error.response.data : error.message);
    }
  };

  return (
    <section className="bg-cdverde">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <div className="w-full bg-cream rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-cdverde md:text-2xl">
              Registrarse
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleRegister}>
              <div>
                <label htmlFor="usuario" className="block mb-2 text-sm font-medium text-cdverde text-left ml-1">
                  Usuario
                </label>
                <input
                  type="text"
                  name="usuario"
                  id="usuario"
                  value={usuario}
                  onChange={(e) => setUsuario(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="Usuario"
                  required
                />
              </div>
              <div>
                <label htmlFor="contraseña" className="block mb-2 text-sm font-medium text-cdverde text-left ml-1">
                  Contraseña
                </label>
                <input
                  type="password"
                  name="contraseña"
                  id="contraseña"
                  value={contraseña}
                  onChange={(e) => setContraseña(e.target.value)}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required
                />
              </div>
              <button
                type="submit"
                className="text-cream px-4 py-3 rounded-lg mt-10 focus:outline-none bg-cdverde w-11/12 font-bold hover:bg-hover-but"
              >
                Registrarse
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;