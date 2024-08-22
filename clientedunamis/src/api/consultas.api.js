import axios from 'axios';

export const getTexEmpleado = async (cedulaEmpleado) =>
    await axios.get(`http://localhost:4000/texempleado/${cedulaEmpleado}`);

export const consultarPagosXEmpleado = async (cedulaEmpleado) =>
    await axios.get(`http://localhost:4000/pagosxempleado/${cedulaEmpleado}`);

export const consultarComprobantePorPago = async (idPago) =>
    await axios.get(`http://localhost:4000/comprobante/${idPago}`);