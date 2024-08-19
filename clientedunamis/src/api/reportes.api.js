import axios from 'axios';

export const obtenerEmpleadosInactivos = async () =>
    await axios.get('http://localhost:4000/empleadosinactivos');

export const obtenerLongevidad = async () =>
    await axios.get('http://localhost:4000/longevidad');

export const obtenerEmpleadosActivos = async () =>
    await axios.get('http://localhost:4000/empleadosactivos');

export const obtenerSalariosActuales = async () =>
    await axios.get('http://localhost:4000/salariosactuales');

export const obtenerEmpleadosAll = async () =>
    await axios.get('http://localhost:4000/empleadosall');
