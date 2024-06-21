import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Inicio from './Paginas/Inicio';
import Login from './Paginas/Login';

function App() {
  return (

    <BrowserRouter>
      <Routes>
          <Route path="/" element={< Login/>}> </Route>
          <Route path="/inicio" element={< Inicio/>}> </Route>
      </Routes>
    </BrowserRouter>

  );
}

export default App;