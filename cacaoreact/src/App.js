import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';


// Importa los componentes JSX correspondientes
import Home from './pages/Home';
import Entrada from './pages/entrada';
import Salida from './pages/salida';
import Mover from './pages/mover';
import Consulta from './pages/consulta';
import Modificar from './pages/modificar';
import GestionarSalida from './pages/gestionarSalida';


function App() {
  
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/entrada" element={<Entrada />} />
          <Route path="/salida" element={<Salida />} />
          <Route path="/mover" element={<Mover />} />
          <Route path="/consulta" element={<Consulta />} />
          <Route path="/modificar" element={<Modificar />} />
          <Route path="/gestionarSalida" element={<GestionarSalida />} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;
