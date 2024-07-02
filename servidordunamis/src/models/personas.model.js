import { getConexion } from '../bd/conexion.js' //importe de base de datos
import sql from 'mssql'

export const getEmpleados = async (req, res) => {
    const bd = await getConexion()
    const resultado = await bd.request().query('SELECT * FROM Empleados')
    console.log(resultado);
    res.json(resultado.recordset);
}

export const getPersona = (req, res) => {
    res.send('CAMBIO PRUEBA');
}

export const crearEmpleado = async(req, res) => {
    try {
        const bd = await getConexion();

        const insercionPersona = await bd.request()
            .input('PersonaCedula', sql.Int, req.body.PersonaCedula)
            .input('nombre', sql.VarChar, req.body.nombre)
            .input('apellido1', sql.VarChar, req.body.apellido1)
            .input('apellido2', sql.VarChar, req.body.apellido2)
            .input('correo', sql.VarChar, req.body.correo)
            .query(`
                INSERT INTO Persona (PersonaCedula, nombre, apellido1, apellido2, correo)
                VALUES (@PersonaCedula, @nombre, @apellido1, @apellido2, @correo)
            `);

        const insercionEmpleado = await bd.request()
            .input('PersonaCedula', sql.Int, req.body.PersonaCedula)
            .input('idPosicion', sql.Int, req.body.idPosicion)
            .input('fechaDePago', sql.Date, req.body.fechaDePago)
            .input('fechaDeIngreso', sql.Date, req.body.fechaDeIngreso)
            .input('cantidadTrabajosExtras', sql.Int, req.body.cantidadTrabajosExtras)
            .input('activo', sql.Bit, req.body.activo)
            .query(`
                INSERT INTO Empleados (PersonaCedula, idPosicion, fechaDePago, fechaDeIngreso, cantidadTrabajosExtras, activo)
                VALUES (@PersonaCedula, @idPosicion, @fechaDePago, @fechaDeIngreso, @cantidadTrabajosExtras, @activo)
            `);
        res.status(200).send('Inserción exitosa');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al ingresar el empleado');
    }
}

export const borrarPersona = (req, res) => {
    res.send('Persona Borrada');
}

export const modificarPersona = (req, res) => {
    res.send('Persona Actualizada');
}