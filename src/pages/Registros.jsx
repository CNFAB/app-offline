import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Alert, Badge, Modal } from 'react-bootstrap';
import { 
  obtenerRegistros, 
  eliminarRegistro, 
  eliminarTodosRegistros,
  contarRegistros 
} from '../services/db';
import { exportarAExcel } from '../services/exportService';
import ConnectionStatus from '../components/ConnectionStatus';

const Registros = () => {
  const [registros, setRegistros] = useState([]);
  const [total, setTotal] = useState(0);
  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });
  const [showModal, setShowModal] = useState(false);
  const [cargando, setCargando] = useState(false);

  const cargarRegistros = async () => {
    try {
      const datos = await obtenerRegistros();
      setRegistros(datos);
      const count = await contarRegistros();
      setTotal(count);
    } catch (error) {
      setMensaje({ texto: 'Error al cargar registros', tipo: 'danger' });
    }
  };

  useEffect(() => {
    cargarRegistros();
  }, []);

  const handleEliminar = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este registro?')) {
      try {
        await eliminarRegistro(id);
        await cargarRegistros();
        setMensaje({ texto: '✅ Registro eliminado correctamente', tipo: 'success' });
        setTimeout(() => setMensaje({ texto: '', tipo: '' }), 3000);
      } catch (error) {
        setMensaje({ texto: '❌ Error al eliminar', tipo: 'danger' });
      }
    }
  };

  const handleEliminarTodos = async () => {
    setShowModal(false);
    try {
      await eliminarTodosRegistros();
      await cargarRegistros();
      setMensaje({ texto: '✅ Todos los registros eliminados', tipo: 'success' });
      setTimeout(() => setMensaje({ texto: '', tipo: '' }), 3000);
    } catch (error) {
      setMensaje({ texto: '❌ Error al eliminar todos', tipo: 'danger' });
    }
  };

  const handleExportar = async () => {
    setCargando(true);
    try {
      await exportarAExcel(registros);
      setMensaje({ texto: '✅ Excel exportado correctamente', tipo: 'success' });
      setTimeout(() => setMensaje({ texto: '', tipo: '' }), 3000);
    } catch (error) {
      setMensaje({ texto: '❌ Error al exportar: ' + error.message, tipo: 'danger' });
    } finally {
      setCargando(false);
    }
  };

  return (
    <Container>
      <h1 className="mb-4">
        📋 Registros Guardados
        <ConnectionStatus />
      </h1>

      {mensaje.texto && (
        <Alert variant={mensaje.tipo} onClose={() => setMensaje({ texto: '', tipo: '' })} dismissible>
          {mensaje.texto}
        </Alert>
      )}

      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <Badge bg="primary" className="me-2">
            Total: {total} registros
          </Badge>
        </div>
        <div>
          <Button 
            variant="success" 
            onClick={handleExportar}
            disabled={cargando || registros.length === 0}
            className="me-2"
          >
            {cargando ? 'Exportando...' : '📊 Exportar Excel'}
          </Button>
          <Button 
            variant="danger" 
            onClick={() => setShowModal(true)}
            disabled={registros.length === 0}
          >
            🗑️ Eliminar Todos
          </Button>
        </div>
      </div>

      {registros.length === 0 ? (
        <Alert variant="info">
          No hay registros guardados. Ve al formulario para agregar algunos.
        </Alert>
      ) : (
        <div className="table-responsive">
          <Table striped bordered hover>
            <thead className="table-primary">
              <tr>
                <th>ID</th>
                <th>Nombre</th>
                <th>DNI</th>
                <th>Localidad</th>
                <th>Edad</th>
                <th>Observaciones</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {registros.map((registro) => (
                <tr key={registro.id}>
                  <td>{registro.id}</td>
                  <td>{registro.nombre}</td>
                  <td>{registro.dni}</td>
                  <td>{registro.localidad}</td>
                  <td>{registro.edad}</td>
                  <td>{registro.observaciones || '-'}</td>
                  <td style={{ fontSize: '0.85rem' }}>
                    {new Date(registro.fecha).toLocaleDateString()} <br />
                    <small>{new Date(registro.fecha).toLocaleTimeString()}</small>
                  </td>
                  <td>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleEliminar(registro.id)}
                    >
                      🗑️
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      )}

      {/* Modal de confirmación para eliminar todos */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>⚠️ Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que quieres eliminar TODOS los {total} registros?
          Esta acción no se puede deshacer.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleEliminarTodos}>
            Sí, eliminar todos
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default Registros;