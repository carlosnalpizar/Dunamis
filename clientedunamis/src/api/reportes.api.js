import axios from 'axios';

export const obtenerEmpleadosInactivos = async () =>
    await axios.get('http://localhost:4000/empleadosinactivos');

export const obtenerEmpleadosActivos = async () =>
    await axios.get('http://localhost:4000/empleadosactivos');
