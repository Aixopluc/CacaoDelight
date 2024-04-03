import { Link } from 'react-router-dom';


function Home() {
  return (
    <div>
      <Link to="/entrada">entrada</Link>
      <Link to="/salida">salida</Link>
      <Link to="/mover">mover</Link>
      <Link to="/consultar">consultar</Link>
      <Link to="/modificar">modificar</Link>
      <Link to="/gestionarSalida">Gestionar Salida</Link>
    </div>
  );
}

export default Home;
