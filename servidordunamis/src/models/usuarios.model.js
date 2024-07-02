import { getConexion } from '../bd/conexion.js' //importe de base de datos
import sql from 'mssql'

export const getUsuarios = async (req, res) => {
    const bd = await getConexion()
    const resultado = await bd.request().query('SELECT * FROM Usuarios')
    console.log(resultado);
    res.json(resultado.recordset);
}

export const getUsuario = (req, res) => {
    res.send('CAMBIO PRUEBA');
}

export const crearUsuario = async(req, res) => {
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

        const insercionUsuario = await bd.request()
            .input('idUsuario', sql.Int, req.body.idUsuario)
            .input('PersonaCedula', sql.Int, req.body.PersonaCedula)
            .input('contrasena', sql.VarChar, req.body.contrasena)
            .input('idRoles', sql.Int, req.body.idRoles)
            .query(`
                INSERT INTO Usuarios (idUsuario, PersonaCedula, contrasena, idRoles)
                VALUES (@idUsuario, @PersonaCedula, @contrasena, @idRoles)
            `);
        res.status(200).send('Inserción exitosa');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al ingresar el empleado');
    }
}
