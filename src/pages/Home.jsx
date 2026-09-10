import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import InfoPanel from '../components/InfoPanel';

const Home = () => {
  return (
    <Container>
      <h1 className="mb-4"> Inicio</h1>
      <InfoPanel />
      
      <Row className="mt-4">
        <Col md={6} className="mb-3">
          <div className="p-4 border rounded text-center bg-light">
            <h3> Nuevo Registro</h3>
            <p>Captura datos de una persona</p>
            <Button as={Link} to="/formulario" variant="primary">
              Ir al Formulario
            </Button>
          </div>
        </Col>
        <Col md={6} className="mb-3">
          <div className="p-4 border rounded text-center bg-light">
            <h3> Ver Registros</h3>
            <p>Gestiona todos los registros guardados</p>
            <Button as={Link} to="/registros" variant="success">
              Ver Registros
            </Button>
          </div>
        </Col>
      </Row>

      <div className="mt-4 p-3 bg-info text-white rounded">
        <h5> Información</h5>
        <p className="mb-0">
          Esta aplicación funciona completamente OFFLINE. 
          Todos los datos se guardan localmente en tu dispositivo.
          Puedes exportar todos los registros a Excel cuando quieras.
        </p>
      </div>
    </Container>
  );
};

export default Home;