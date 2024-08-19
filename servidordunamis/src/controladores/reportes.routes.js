import { Router } from 'express';
import { consultarEmpleados, consultarEmpleadosActivos, consultarEmpleadosInactivos, consultarLongevidadEmpleados, consultarSalariosActuales } from '../models/reportes.model.js';

/*
El uso de controladores funciona por rutas, cada vez que el servidor recibe una peticion HTTP
el controlador (llamado router en EXPRESS) la clasifica segun el tipo de peticion y segun el 
tipo de ruta que  se le solicita desde el API del cliente; el controlador ejecutara
el metodo que está relacionado con la ruta
*/

const routerReportes = Router();

routerReportes.get('/empleadosactivos', consultarEmpleadosActivos);
routerReportes.get('/empleadosinactivos', consultarEmpleadosInactivos);
routerReportes.get('/salariosactuales', consultarSalariosActuales);
routerReportes.get('/empleadosall', consultarEmpleados);
routerReportes.get('/longevidad', consultarLongevidadEmpleados);

export default routerReportes;