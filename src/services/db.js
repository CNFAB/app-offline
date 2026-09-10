import { openDB } from 'idb';

// Nombre de la base de datos
const DB_NAME = 'FormulariosDB';
const DB_VERSION = 1;
const STORE_NAME = 'registros';

// Inicializar la base de datos
export const initDB = async () => {
  return openDB(DB_NAME, DB_VERSION, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, {
          keyPath: 'id',
          autoIncrement: true,
        });
        // Crear índices para búsquedas rápidas
        store.createIndex('fecha', 'fecha');
        store.createIndex('nombre', 'nombre');
      }
    },
  });
};

// Crear un nuevo registro
export const crearRegistro = async (datos) => {
  const db = await initDB();
  const registro = {
    ...datos,
    fecha: new Date().toISOString(),
    fechaGuardado: new Date().toLocaleString(),
  };
  const id = await db.add(STORE_NAME, registro);
  return { ...registro, id };
};

// Obtener todos los registros
export const obtenerRegistros = async () => {
  const db = await initDB();
  return await db.getAll(STORE_NAME);
};

// Obtener un registro por ID
export const obtenerRegistroPorId = async (id) => {
  const db = await initDB();
  return await db.get(STORE_NAME, id);
};

// Eliminar un registro por ID
export const eliminarRegistro = async (id) => {
  const db = await initDB();
  await db.delete(STORE_NAME, id);
};

// Eliminar todos los registros
export const eliminarTodosRegistros = async () => {
  const db = await initDB();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  await tx.objectStore(STORE_NAME).clear();
  await tx.done;
};

// Contar registros
export const contarRegistros = async () => {
  const db = await initDB();
  return await db.count(STORE_NAME);
};

// Obtener el último registro guardado
export const obtenerUltimoRegistro = async () => {
  const db = await initDB();
  const todos = await db.getAll(STORE_NAME);
  return todos.length > 0 ? todos[todos.length - 1] : null;
};