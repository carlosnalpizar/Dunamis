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

export const consultarPagosXEmpleado = async (req, res) => {
    const { ced } = req.params;
    const bd = await getConexion();
    try {
        // Consulta para obtener los trabajos extras realizados por el empleado
        const resultado = await bd.request()
        .input('cedula', sql.Int, ced)
        .query(`select * from Pagos where Empleado_Cedula=@cedula`);

        res.json(resultado.recordset); // Enviar el resultado como JSON
    } catch (error) {
        console.error('Error al realizar la consulta:', error);
        res.status(500).json({ error: 'Error en el servidor' }); // Manejo de errores
    }
};

export const consultarComprobantePorPago = async (req, res) => {
    const { id } = req.params;
    const bd = await getConexion();
    try {
        // Consulta para obtener los trabajos extras realizados por el empleado
        const resultado = await bd.request()
        .input('id', sql.Int, id)
        .query(`select * from comprobantePago where idPago=@id`);

        res.json(resultado.recordset); // Enviar el resultado como JSON
    } catch (error) {
        console.error('Error al realizar la consulta:', error);
        res.status(500).json({ error: 'Error en el servidor' }); // Manejo de errores
    }
};