import { getConexion } from '../bd/conexion.js'; // Importe de base de datos
import sql from 'mssql';

export const consultarEmpleadosActivos = async (req, res) => {
    const bd = await getConexion();
    const resultado = await bd.request().query(`
        SELECT 
            e.idEmpleado, 
            e.idPosicion, 
            e.fechaDePago, 
            e.fechaDeIngreso, 
            e.cantidadTrabajosExtras, 
            e.activo,
            p.PersonaCedula,
            p.nombre,
            p.apellido1,
            p.apellido2,
            p.correo
        FROM empleados e 
        INNER JOIN Persona p ON e.PersonaCedula = p.PersonaCedula
        WHERE e.activo = 1
    `);
    res.json(resultado.recordset);
};

export const consultarEmpleadosInactivos = async (req, res) => {
    const bd = await getConexion();
    const resultado = await bd.request().query(`
        SELECT 
            e.idEmpleado, 
            e.idPosicion, 
            e.fechaDePago, 
            e.fechaDeIngreso, 
            e.cantidadTrabajosExtras, 
            e.activo,
            p.PersonaCedula,
            p.nombre,
            p.apellido1,
            p.apellido2,
            p.correo
        FROM empleados e 
        INNER JOIN Persona p ON e.PersonaCedula = p.PersonaCedula
        WHERE e.activo = 0
    `);
    res.json(resultado.recordset);
};
