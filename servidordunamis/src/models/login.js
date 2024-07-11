import { getConexion } from '../bd/conexion.js'; // Importe de base de datos
import sql from 'mssql';

export const Login = async (req, res) => {
    const { idUsuario, contrasena } = req.body;
    try {
        const bd = await getConexion();
        const request = bd.request();
        
        // parámetros
        request.input('idUsuario', sql.Int, idUsuario);
        request.input('contrasena', sql.VarChar, contrasena);

        const resultado = await request.query(`
            SELECT * FROM Usuarios
            WHERE idUsuario = @idUsuario AND contrasena = @contrasena
        `);

        const usuario = resultado.recordset;

        // Si no trae nada la consulta:
        if (!usuario || !usuario.length) {
            return res.status(404).json({ mensaje: 'Empleado no encontrado' });
        }

        res.status(200).json({ mensaje: 'Inicio de sesión exitoso', usuario });

    } catch (error) {
        console.log('Error al iniciar sesión:', error);
        res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};
