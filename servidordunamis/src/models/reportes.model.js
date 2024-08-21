import { getConexion } from '../bd/conexion.js'; // Importe de base de datos
import sql from 'mssql';

export const consultarEmpleadosActivos = async (req, res) => {
    const bd = await getConexion();
    const resultado = await bd.request().query(`
        SELECT 
            e.idEmpleado, 
            e.idPosicion, 
            dp.descripcionPosicion,  -- Nueva columna
            dp.salario,              -- Nueva columna
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
        INNER JOIN diccionarioPosicion dp ON e.idPosicion = dp.idPosicion  -- Nuevo JOIN
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
            dp.descripcionPosicion,  -- Nueva columna
            dp.salario,              -- Nueva columna
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
        INNER JOIN diccionarioPosicion dp ON e.idPosicion = dp.idPosicion  -- Nuevo JOIN
        WHERE e.activo = 0
    `);
    res.json(resultado.recordset);
};

export const consultarSalariosActuales = async (req, res) => {
    try {
        const bd = await getConexion();
        const resultado = await bd.request().query(`
            SELECT 
                p.PersonaCedula, 
                p.nombre, 
                p.apellido1, 
                p.apellido2, 
                dp.salario
            FROM Persona p
            JOIN Empleados e ON p.PersonaCedula = e.PersonaCedula
            JOIN diccionarioPosicion dp ON e.idPosicion = dp.idPosicion
            WHERE e.activo = 1;
        `);
        res.json(resultado.recordset);
    } catch (error) {
        res.status(500).send("Error al consultar los salarios actuales: " + error.message);
    }
};

export const consultarEmpleados = async (req, res) => {
    const bd = await getConexion();
    const resultado = await bd.request().query(`
        SELECT 
            e.idEmpleado, 
            e.idPosicion, 
            dp.descripcionPosicion,  -- Nueva columna
            dp.salario,              -- Nueva columna
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
        INNER JOIN diccionarioPosicion dp ON e.idPosicion = dp.idPosicion  -- Nuevo JOIN
    `);
    res.json(resultado.recordset);
};

export const consultarLongevidadEmpleados = async (req, res) => {
    try {
        const bd = await getConexion();
        const resultado = await bd.request().query(`
            SELECT 
                e.idEmpleado, 
                p.PersonaCedula,
                p.nombre,
                p.apellido1,
                p.apellido2,
                dp.descripcionPosicion,  -- Posición del empleado
                dp.salario,              -- Salario del empleado
                e.fechaDeIngreso,        -- Fecha de ingreso del empleado
                DATEDIFF(YEAR, e.fechaDeIngreso, GETDATE()) AS añosEnEmpresa,  -- Calcula los años de antigüedad
                DATEDIFF(MONTH, e.fechaDeIngreso, GETDATE()) % 12 AS mesesEnEmpresa  -- Calcula los meses adicionales
            FROM empleados e
            INNER JOIN Persona p ON e.PersonaCedula = p.PersonaCedula
            INNER JOIN diccionarioPosicion dp ON e.idPosicion = dp.idPosicion
            ORDER BY añosEnEmpresa DESC, mesesEnEmpresa DESC;  -- Ordena por mayor antigüedad
        `);
        res.json(resultado.recordset);
    } catch (error) {
        res.status(500).send("Error al consultar la longevidad de empleados: " + error.message);
    }
};

export const consultarDeduccionesPorLey = async (req, res) => {
    try {
        const bd = await getConexion();
        const resultado = await bd.request().query(`
            SELECT
                * from deducciones
        `);
        res.json(resultado.recordset);
    } catch (error) {
        res.status(500).send("Error al consultar las deducciones por ley: " + error.message);
    }
};

export const consultarTrabajosExtrasRealizados = async (req, res) => {
    const bd = await getConexion();
    const resultado = await bd.request().query(`
        SELECT * 
        FROM TrabajosExtra te 
        JOIN Persona p ON te.idEmpleado = p.PersonaCedula;
    `);
    res.json(resultado.recordset);
};

export const consultarEmpleadosConMasTrabajosExtra = async (req, res) => {
    try {
        const bd = await getConexion();
        const resultado = await bd.request().query(`
            
SELECT 
    e.idEmpleado, 
    p.PersonaCedula,
    p.nombre,
    p.apellido1,
    p.apellido2,
    e.cantidadTrabajosExtras
FROM empleados e
INNER JOIN Persona p ON e.PersonaCedula = p.PersonaCedula
WHERE e.cantidadTrabajosExtras = (
    SELECT MAX(cantidadTrabajosExtras)
    FROM empleados
)

        `);
        res.json(resultado.recordset);
    } catch (error) {
        res.status(500).send("Error al consultar los empleados con más trabajos extra: " + error.message);
    }
};


export const consultarPagosDeHoy = async (req, res) => {
    try {
        const bd = await getConexion();
        const resultado = await bd.request().query(`
 SELECT *
FROM comprobantePago
WHERE CONVERT(date, fechaComprobante) = CONVERT(date, GETDATE());
        `);
        res.json(resultado.recordset);
    } catch (error) {
        res.status(500).send("Error al consultar los empleados con más trabajos extra: " + error.message);
    }
};


export const montosSalarioTotal = async (req, res) => {
    try {
        const bd = await getConexion();
        const resultado = await bd.request().query(`
SELECT 
    e.PersonaCedula,
    p.nombre,
    p.apellido1,
    p.apellido2,
    dp.salario
FROM 
    Empleados e
JOIN 
    Persona p ON e.PersonaCedula = p.PersonaCedula
JOIN 
    diccionarioPosicion dp ON e.idPosicion = dp.idPosicion
WHERE 
    e.activo = 1;
        `);
        res.json(resultado.recordset);
    } catch (error) {
        res.status(500).send("Error al consultar los empleados con más trabajos extra: " + error.message);
    }
};

