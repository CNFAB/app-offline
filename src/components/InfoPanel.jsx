import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { contarRegistros, obtenerUltimoRegistro } from '../services/db';
import { useOnlineStatus } from '../hooks/useOnlineStatus';

const InfoPanel = () => {
  const [totalRegistros, setTotalRegistros] = useState(0);
  const [ultimoRegistro, setUltimoRegistro] = useState(null);
  const isOnline = useOnlineStatus();

  useEffect(() => {
    const cargarInfo = async () => {
      const total = await contarRegistros();
      const ultimo = await obtenerUltimoRegistro();
      setTotalRegistros(total);
      setUltimoRegistro(ultimo);
    };
    cargarInfo();
  }, []);

  return (
    <Card className="mb-4">
      <Card.Body>
        <Row>
          <Col md={4}>
            <h6> Registros almacenados</h6>
            <h3>{totalRegistros}</h3>
          </Col>
          <Col md={4}>
            <h6> Estado</h6>
            <h3>{isOnline ? '🟢 Online' : '🔴 Offline'}</h3>
          </Col>
          <Col md={4}>
            <h6> Último registro</h6>
            <h6 style={{ fontSize: '0.9rem' }}>
              {ultimoRegistro 
                ? `${ultimoRegistro.nombre || 'Sin nombre'} - ${new Date(ultimoRegistro.fecha).toLocaleDateString()}`
                : 'Sin registros'}
            </h6>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default InfoPanel;