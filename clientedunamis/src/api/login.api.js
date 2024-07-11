import axios from 'axios';

export const inicioSesion = async (idUsuario, contrasena) => {
    const response = await axios.post('http://localhost:4000/login', {idUsuario,contrasena});
    return response;
};
