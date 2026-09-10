import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Formulario from './pages/Formulario';
import Registros from './pages/Registros';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/formulario" element={<Formulario />} />
          <Route path="/registros" element={<Registros />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;