import axios from 'axios';

export const ingresarUsuario = async (usuarioNuevo) =>
    await axios.post('http://localhost:4000/usuario', usuarioNuevo);