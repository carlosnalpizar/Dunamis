import { getConexion } from '../bd/conexion.js' //importe de base de datos

export const getPersonas = (req, res) => {
    res.send('obteniendo dskjfhesihj');
}

export const getPersona = (req, res) => {
    res.send('obteniendo persona');
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