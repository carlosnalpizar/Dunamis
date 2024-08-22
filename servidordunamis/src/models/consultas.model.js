import { getConexion } from '../bd/conexion.js'; // Importe de base de datos
import sql from 'mssql';

export const consultarTrabajosExtrasPorEmpleado = async (req, res) => {
    const { ced } = req.params;
    const bd = await getConexion();
    try {
        // Consulta para obtener los trabajos extras realizados por el empleado
        const resultado = await bd.request()
        .input('cedula', sql.Int, ced)
        .query(`SELECT * From TrabajosExtra where idEmpleado = @cedula`);

        res.json(resultado.recordset); // Enviar el resultado como JSON
    } catch (error) {
        console.error('Error al realizar la consulta:', error);
        res.status(500).json({ error: 'Error en el servidor' }); // Manejo de errores
    }
};