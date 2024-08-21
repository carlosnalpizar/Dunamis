import axios from 'axios';

export const obtenerEmpleadosInactivos = async () =>
    await axios.get('http://localhost:4000/empleadosinactivos');

export const obtenerLongevidad = async () =>
    await axios.get('http://localhost:4000/longevidad');

export const obtenerDeducciones = async () =>
    await axios.get('http://localhost:4000/deduccionesley');

export const obtenerPagosHoy = async () =>
    await axios.get('http://localhost:4000/pagoshoy');

export const montosTotales = async () =>
    await axios.get('http://localhost:4000/montos');

export const obtenerEmpleadosActivos = async () =>
    await axios.get('http://localhost:4000/empleadosactivos');

export const obtenerSalariosActuales = async () =>
    await axios.get('http://localhost:4000/salariosactuales');

export const obtenerEmpleadosAll = async () =>
    await axios.get('http://localhost:4000/empleadosall');

export const obtenerTrabajosExtras = async () =>
    await axios.get('http://localhost:4000/trabajosextras');

export const consultarMasExtras = async () =>
    await axios.get('http://localhost:4000/masExtras');