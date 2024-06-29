/*

NO MODIFICAR. Solo "user" y "password" deben ser modificables en este archivo

*/

import sql from 'mssql';

const baseDatos = {
    server: 'LAPTOPLENIN',
    database: 'MarioOdyssey',
    user: 'Desarrollos', // Reemplazar usuario
    password: 'desarrollos', // Reemplazar contrasena
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

export const getConexion = async () => {
    try {
        const conexion = await sql.connect(baseDatos);
        return conexion;
    } catch (error) {
        console.log(error);
    }
};
