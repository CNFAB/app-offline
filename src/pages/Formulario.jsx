import React, { useState } from 'react';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import { crearRegistro } from '../services/db';
import ConnectionStatus from '../components/ConnectionStatus';

const Formulario = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    dni: '',
    localidad: '',
    edad: '',
    observaciones: ''
  });

  const [mensaje, setMensaje] = useState({ texto: '', tipo: '' });
  const [cargando, setCargando] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validarCampos = () => {
    const { nombre, dni, localidad, edad } = formData;
    if (!nombre.trim()) return 'El nombre es obligatorio';
    if (!dni.trim()) return 'El DNI es obligatorio';
    if (!localidad.trim()) return 'La localidad es obligatoria';
    if (!edad.trim()) return 'La edad es obligatoria';
    if (isNaN(edad) || parseInt(edad) < 0 || parseInt(edad) > 120) {
      return 'La edad debe ser un número válido entre 0 y 120';
    }
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const error = validarCampos();
    if (error) {
      setMensaje({ texto: error, tipo: 'danger' });
      return;
    }

    setCargando(true);
    try {
      await crearRegistro(formData);
      setMensaje({ 
        texto: ' ¡Registro guardado exitosamente!', 
        tipo: 'success' 
      });
      // Limpiar formulario
      setFormData({
        nombre: '',
        dni: '',
        localidad: '',
        edad: '',
        observaciones: ''
      });
    } catch (error) {
      setMensaje({ 
        texto: ' Error al guardar: ' + error.message, 
        tipo: 'danger' 
      });
    } finally {
      setCargando(false);
    }
  };

  return (
    <Container>
      <h1 className="mb-4">
        📝 Nuevo Registro
        <ConnectionStatus />
      </h1>

      {mensaje.texto && (
        <Alert 
          variant={mensaje.tipo} 
          onClose={() => setMensaje({ texto: '', tipo: '' })} 
          dismissible
        >
          {mensaje.texto}
        </Alert>
      )}

      <Card>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nombre *</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                placeholder="Ingresa el nombre completo"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>DNI *</Form.Label>
              <Form.Control
                type="text"
                name="dni"
                value={formData.dni}
                onChange={handleChange}
                placeholder="Ingresa el DNI"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Localidad *</Form.Label>
              <Form.Control
                type="text"
                name="localidad"
                value={formData.localidad}
                onChange={handleChange}
                placeholder="Ingresa la localidad"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Edad *</Form.Label>
              <Form.Control
                type="number"
                name="edad"
                value={formData.edad}
                onChange={handleChange}
                placeholder="Ingresa la edad"
                min="0"
                max="120"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Observaciones</Form.Label>
              <Form.Control
                as="textarea"
                name="observaciones"
                value={formData.observaciones}
                onChange={handleChange}
                placeholder="Observaciones adicionales (opcional)"
                rows={3}
              />
            </Form.Group>

            <Button 
              variant="primary" 
              type="submit" 
              disabled={cargando}
              className="w-100"
            >
              {cargando ? 'Guardando...' : ' Guardar Registro'}
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Formulario;