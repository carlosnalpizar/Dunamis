import axios from 'axios';

export const ingresarEmpleado = async (empleadoNuevo) =>
    await axios.post('http://localhost:4000/persona', empleadoNuevo);

