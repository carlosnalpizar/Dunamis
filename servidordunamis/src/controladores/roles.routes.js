import { Router } from 'express';
import { getRoles } from '../models/roles.model.js';

/*
El uso de controladores funciona por rutas, cada vez que el servidor recibe una peticion HTTP
el controlador (llamado router en EXPRESS) la clasifica segun el tipo de peticion y segun el 
tipo de ruta que  se le solicita desde el API del cliente; el controlador ejecutara
el metodo que está relacionado con la ruta
*/

const routerRoles = Router();

routerRoles.get('/roles', getRoles);

export default routerRoles;