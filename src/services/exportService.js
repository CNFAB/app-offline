import * as XLSX from 'xlsx';

export const exportarAExcel = async (registros) => {
  if (!registros || registros.length === 0) {
    throw new Error('No hay registros para exportar');
  }

  // Preparar datos para Excel
  const datosExcel = registros.map(reg => ({
    ID: reg.id,
    Nombre: reg.nombre,
    DNI: reg.dni,
    Localidad: reg.localidad,
    Edad: reg.edad,
    Observaciones: reg.observaciones || '',
    Fecha: new Date(reg.fecha).toLocaleString()
  }));

  // Crear libro de Excel
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(datosExcel);
  XLSX.utils.book_append_sheet(wb, ws, 'Registros');

  // Generar nombre de archivo con fecha
  const fecha = new Date().toISOString().slice(0, 10);
  const nombreArchivo = `formularios_${fecha}.xlsx`;

  // Descargar archivo
  XLSX.writeFile(wb, nombreArchivo);
  
  return nombreArchivo;
};