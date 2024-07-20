import axios from 'axios';

export const ingresarEmpleado = async (empleadoNuevo) =>
    await axios.post('http://localhost:4000/persona', empleadoNuevo);

export const obtenerEmpleados = async () =>
    await axios.get('http://localhost:4000/persona');

export const obtenerEmpleadosActivos = async () =>
    await axios.get('http://localhost:4000/persona/activos');

export const actualizarEstado = async (empleadoId) =>
    await axios.put(`http://localhost:4000/persona/${empleadoId}`);

export const agregarTrabajosExtras = async (empleadoId, descripcionTrabajo) => {
    await axios.post(`http://localhost:4000/persona/${empleadoId}/trabajos`, { descripcionTrabajo });
};
