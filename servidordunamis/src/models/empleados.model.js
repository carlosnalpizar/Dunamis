import { getConexion } from '../bd/conexion.js' //importe de base de datos
import sql from 'mssql'

export const getEmpleados = async (req, res) => {
    const bd = await getConexion()
    const resultado = await bd.request().query(`SELECT 
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
    INNER JOIN Persona p ON e.PersonaCedula = p.PersonaCedula;
`)
    res.json(resultado.recordset);
}

export const getEmpleadosActivos = async (req, res) => {
    const bd = await getConexion()
    const resultado = await bd.request().query(`SELECT 
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
    INNER JOIN Persona p ON e.PersonaCedula = p.PersonaCedula WHERE e.activo = 1;
`)
    res.json(resultado.recordset);
}

export const getPersona = (req, res) => {
    res.send('CAMBIO PRUEBA');
}

export const crearEmpleado = async(req, res) => {
    try {
        const bd = await getConexion();

        const fechaActual = new Date();
        const accionRealizada = "Se registro un empleado";

        const insercionPersona = await bd.request()
            .input('cedula', sql.Int, req.body.cedula)
            .input('nombre', sql.VarChar, req.body.nombre)
            .input('apellido1', sql.VarChar, req.body.apellido1)
            .input('apellido2', sql.VarChar, req.body.apellido2)
            .input('correo', sql.VarChar, req.body.correo)
            .query(`
                INSERT INTO Persona (PersonaCedula, nombre, apellido1, apellido2, correo)
                VALUES (@cedula, @nombre, @apellido1, @apellido2, @correo)
            `);

        const cantidadTrabExtras = 0;
        const activo = 1;

        const insercionEmpleado = await bd.request()
            .input('cedula', sql.Int, req.body.cedula)
            .input('idPosicion', sql.Int, req.body.posicion)
            .input('fechaDePago', sql.Date, req.body.ingreso)
            .input('fechaDeIngreso', sql.Date, req.body.ingreso)
            .input('cantidadTrabajosExtras', sql.Int, cantidadTrabExtras)
            .input('activo', sql.Bit, activo)
            .query(`
                INSERT INTO Empleados (PersonaCedula, idPosicion, fechaDePago, fechaDeIngreso, cantidadTrabajosExtras, activo)
                VALUES (@cedula, @idPosicion, @fechaDePago, @fechaDeIngreso, @cantidadTrabajosExtras, @activo)
            `);
    
        const insercionBitacora = await bd.request()
            .input('cedula', sql.Int, req.body.cedula)
            .input('fecha', sql.DateTime, fechaActual)
            .input('AccionRealizada', sql.VarChar, accionRealizada)
            .query(`
                INSERT INTO Bitacoras (PersonaCedula, fecha, AccionRealizada)
                VALUES (@cedula, @fecha, @AccionRealizada)
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

export const agregarTrabajos = async (req, res) => {
    const id = req.params.id;
    const descripcionTrabajoExtra = req.body.descripcionTrabajo;
    const bd = await getConexion();

    if (!descripcionTrabajoExtra || descripcionTrabajoExtra.trim() === '') {
        return res.status(400).send({ success: false, message: 'La descripción del trabajo extra no puede estar vacía' });
    }

    try {
        const agregarTrabajo = await bd.request()
            .input('idEmpleado', sql.Int, id)
            .input('descripcion', sql.VarChar, descripcionTrabajoExtra)
            .query(`
                INSERT INTO TrabajosExtra (DescripcionTrabajoExtra, idEmpleado)
                VALUES (@descripcion, @idEmpleado)
            `);

        if (agregarTrabajo.rowsAffected[0] === 0) {
            return res.status(404).send({ success: false, message: 'Error al insertar trabajo extra' });
        }

        const actualizarCantidad = await bd.request()
            .input('idEmpleado', sql.Int, id)
            .query(`
                UPDATE Empleados
                SET cantidadTrabajosExtras = cantidadTrabajosExtras + 1
                WHERE PersonaCedula = @idEmpleado
            `);

        if (actualizarCantidad.rowsAffected[0] === 0) {
            return res.status(404).send({ success: false, message: 'Empleado no encontrado' });
        }

        res.send({ success: true });
    } catch (error) {
        console.error("Error al agregar trabajos extras:", error);
        res.status(500).send({ success: false, message: 'Error al agregar trabajos extras' });
    }
};


export const modificarEmpleado = async (req, res) => {
    const id = req.params.id;
    const bd = await getConexion();

    const modificacionEmpleado = await bd.request()
        .input('idEmpleado', sql.Int, id)
        .query(`
            UPDATE Empleados
            SET activo = CASE WHEN activo = 1 THEN 0 ELSE 1 END
            WHERE idEmpleado = @idEmpleado
        `);
    res.send({ success: true });
}

export const modificarEmpleadoInfo = async (req, res) => {
    const id = req.params.id;
    const { nombre, apellido1, apellido2, correo, idPosicion, fechaDeIngreso, fechaDePago, PersonaCedula } = req.body;
    const bd = await getConexion();

    try {
        await bd.request()
            .input('PersonaCedula', sql.Int, PersonaCedula)
            .input('nombre', sql.VarChar, nombre)
            .input('apellido1', sql.VarChar, apellido1)
            .input('apellido2', sql.VarChar, apellido2)
            .input('correo', sql.VarChar, correo)
            .query(`
                UPDATE Persona
                SET 
                    nombre = @nombre,
                    apellido1 = @apellido1,
                    apellido2 = @apellido2,
                    correo = @correo
                WHERE PersonaCedula = @PersonaCedula
            `);

        await bd.request()
            .input('idEmpleado', sql.Int, id)
            .input('idPosicion', sql.Int, idPosicion)
            .input('fechaDeIngreso', sql.Date, fechaDePago)
            .input('fechaDePago', sql.Date, fechaDePago)
            .query(`
                UPDATE Empleados
                SET 
                    idPosicion = @idPosicion,
                    fechaDeIngreso = @fechaDeIngreso,
                    fechaDePago = @fechaDePago
                WHERE idEmpleado = @idEmpleado
            `);

        res.send({ success: true, message: 'Empleado actualizado exitosamente' });
    } catch (error) {
        console.error('Error al modificar empleado:', error);
        res.status(500).send({ success: false, message: 'Error al modificar el empleado' });
    }
};
