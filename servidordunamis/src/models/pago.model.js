import { getConexion } from '../bd/conexion.js'; // Importe de base de datos
import sql from 'mssql';

export const getComprobante = async (req, res) => {
    try {
        const bd = await getConexion();

        // Primera consulta: obtener el último comprobante de pago
        const resultadoComprobante = await bd.request()
            .query(`
                SELECT TOP 1
                    idPago,
                    montoFinal,
                    fechaComprobante,
                    descripcion,
                    cedulaEmpleado,
                    nombreEmpleado,
                    apellido1Empleado,
                    apellido2Empleado,
                    correoEmpleado
                FROM comprobantePago
                ORDER BY fechaComprobante DESC
            `);

        // Segunda consulta: obtener deducciones relacionadas
        const ConsultaDeducciones = await bd.request()
            .query(`
                SELECT TOP 4
                    pd.idPagos,
                    pd.tipoDeduccion,
                    d.descripcionDeduccion,
                    d.montoDeduccion
                FROM 
                    pagosDeducciones pd
                JOIN 
                    Deducciones d ON pd.tipoDeduccion = d.idDeducciones
                ORDER BY 
                    pd.idPagos DESC;
            `);

        // Verifica si hay resultados en ambas consultas
        if (resultadoComprobante.recordset.length > 0) {
            res.json({
                comprobante: resultadoComprobante.recordset[0], // El último comprobante
                infodeducciones: ConsultaDeducciones.recordset // Otras informaciones
            });
        } else {
            res.status(404).json({ message: 'Comprobante no encontrado' });
        }
    } catch (error) {
        console.error('Error al obtener el comprobante:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};




export const pagarSalario = async (req, res) => {
    try {
        const bd = await getConexion();
        const { cedula } = req.body;
        const fechaActual = new Date();

        // Obtener la información del empleado y su salario
        const empleado = await bd.request()
            .input('cedula', sql.Int, cedula)
            .query(`
                SELECT e.PersonaCedula, e.cantidadTrabajosExtras, dp.salario AS montoSalario, e.fechaDePago,
                p.nombre, p.apellido1, p.apellido2, p.correo
                FROM Empleados e
                JOIN diccionarioPosicion dp ON e.idPosicion = dp.idPosicion
                JOIN Persona p ON e.PersonaCedula = p.PersonaCedula
                WHERE e.PersonaCedula = @cedula
            `);

            const borrarTrabajosExtras = await bd.request()
            .input('cedula', sql.Int, cedula)
            .query(`
                update empleados set cantidadTrabajosExtras = 0 where PersonaCedula = @cedula
            `);

        if (!empleado.recordset.length) {
            return res.status(404).send('Empleado no encontrado');
        }

        const { cantidadTrabajosExtras, montoSalario, fechaDePago, nombre, apellido1, apellido2, correo } = empleado.recordset[0];

        // Verificar si el pago ya se ha realizado para hoy
        const pagoExistente = await bd.request()
            .input('cedula', sql.Int, cedula)
            .input('fechaActual', sql.Date, fechaActual.toISOString().split('T')[0])
            .query(`
                SELECT 1
                FROM Pagos
                WHERE Empleado_Cedula = @cedula AND CONVERT(DATE, fecha_Pago) = @fechaActual
            `);

        if (pagoExistente.recordset.length) {
            return res.status(400).send('El pago ya ha sido realizado para hoy.');
        }

        // Verificar si es el día correcto para pagar
        const diaDePago = new Date(fechaDePago).getDate();
        if (diaDePago !== fechaActual.getDate()) {
            return res.status(400).send('No es el día correcto para realizar el pago.');
        }

        // Calcular el salario final basado en los trabajos extras
        let porcentajeExtra = 0;

        if (cantidadTrabajosExtras >= 10 && cantidadTrabajosExtras <= 50) {
            porcentajeExtra = 2;
        } else if (cantidadTrabajosExtras >= 51 && cantidadTrabajosExtras <= 100) {
            porcentajeExtra = 5;
        } else if (cantidadTrabajosExtras > 100) {
            porcentajeExtra = 7;
        }

        const salarioConExtra = montoSalario + (montoSalario * porcentajeExtra / 100);

        // Obtener todas las deducciones
        const deducciones = await bd.query(`
            SELECT idDeducciones, montoDeduccion
            FROM Deducciones
        `);

        // Calcular el monto total de las deducciones
        let totalDeducciones = 0;

        // Insertar el pago en la tabla Pagos
        const insercionPago = await bd.request()
            .input('cedula', sql.Int, cedula)
            .input('fecha_Pago', sql.Date, fechaActual)
            .query(`
                INSERT INTO Pagos (Empleado_Cedula, fecha_Pago)
                OUTPUT INSERTED.idPagos
                VALUES (@cedula, @fecha_Pago)
            `);

        const idPagos = insercionPago.recordset[0].idPagos;

        for (const deduccion of deducciones.recordset) {
            const montoDeduccion = deduccion.montoDeduccion;
            const montoRealDeduccion = montoDeduccion > 1
                ? montoDeduccion
                : salarioConExtra * montoDeduccion;

            totalDeducciones += montoRealDeduccion;

            // Insertar cada deducción en pagosDeducciones
            await bd.request()
                .input('idPagos', sql.Int, idPagos)
                .input('tipoDeduccion', sql.Int, deduccion.idDeducciones)
                .query(`
                    INSERT INTO pagosDeducciones (tipoDeduccion, idPagos)
                    VALUES (@tipoDeduccion, @idPagos)
                `);
        }

        // Calcular el salario final después de deducciones
        const salarioFinal = salarioConExtra - totalDeducciones;

        // Insertar el comprobante de pago en la tabla comprobantePago
        await bd.request()
            .input('idPago', sql.Int, idPagos)
            .input('montoFinal', sql.Decimal, salarioFinal)
            .input('fechaComprobante', sql.Date, fechaActual)
            .input('descripcion', sql.NVarChar, 'Pago de salario mensual incluidas deducciones y montos extras')
            .input('cedulaEmpleado', sql.Int, cedula)
            .input('nombreEmpleado', sql.NVarChar, nombre)
            .input('apellido1Empleado', sql.NVarChar, apellido1)
            .input('apellido2Empleado', sql.NVarChar, apellido2)
            .input('correoEmpleado', sql.NVarChar, correo)
            .query(`
                INSERT INTO comprobantePago (idPago, montoFinal, fechaComprobante, descripcion, cedulaEmpleado, nombreEmpleado, apellido1Empleado, apellido2Empleado, correoEmpleado)
                VALUES (@idPago, @montoFinal, @fechaComprobante, @descripcion, @cedulaEmpleado, @nombreEmpleado, @apellido1Empleado, @apellido2Empleado, @correoEmpleado)
            `);

        res.status(200).send('Pago realizado con éxito, deducciones aplicadas y comprobante generado.');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error al procesar el pago');
    }
};
