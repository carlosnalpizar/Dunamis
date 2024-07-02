import { getConexion } from '../bd/conexion.js' //importe de base de datos
import sql from 'mssql'

export const getBitacoras = async (req, res) => {
    const bd = await getConexion()
    const resultado = await bd.request().query('SELECT * FROM Bitacoras')
    console.log(resultado);
    res.json(resultado.recordset);
}
