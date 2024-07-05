import { Router } from 'express';
import { getBitacoras } from '../models/bitacora.model.js';
import { getPosiciones } from '../models/posiciones.model.js';


/*
El uso de controladores funciona por rutas, cada vez que el servidor recibe una peticion HTTP
el controlador (llamado router en EXPRESS) la clasifica segun el tipo de peticion y segun el 
tipo de ruta que  se le solicita desde el API del cliente; el controlador ejecutara
el metodo que está relacionado con la ruta
*/

const routerPosiciones = Router();

routerPosiciones.get('/posicion', getPosiciones);

export default routerPosiciones;