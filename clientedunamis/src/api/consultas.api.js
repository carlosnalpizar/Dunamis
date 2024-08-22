import axios from 'axios';

export const getTexEmpleado = async (cedulaEmpleado) =>
    await axios.get(`http://localhost:4000/texempleado/${cedulaEmpleado}`);
