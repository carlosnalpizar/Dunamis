import { getConexion } from '../bd/conexion.js' //importe de base de datos

export const getPersonas = async (req, res) => {
    const bd = await getConexion()
    const resultado = await bd.request().query('SELECT * FROM HistoriaOdyssey')
    console.log(resultado);
    res.json(resultado.recordset);
}

export const getPersona = (req, res) => {
    res.send('CAMBIO PRUEBA');
}

export const crearPersona = (req, res) => {
    res.send('persona hecha');
}

export const borrarPersona = (req, res) => {
    res.send('Persona Borrada');
}

export const modificarPersona = (req, res) => {
    res.send('Persona Actualizada');
}