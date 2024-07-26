import { getConexion } from '../bd/conexion.js'; //importe de base de datos
import sql from 'mssql';

export const getBitacoras = async (req, res) => {
    const bd = await getConexion();
    const resultado = await bd.request().query(`
        SELECT 
            b.*, 
            p.Nombre + ' ' + p.Apellido1 + ' ' + p.Apellido2 AS Nombre  
        FROM 
            Bitacoras b
            INNER JOIN Persona p ON b.PersonaCedula = p.PersonaCedula
        ORDER BY 
            b.fecha DESC
    `);
    res.json(resultado.recordset);
};

