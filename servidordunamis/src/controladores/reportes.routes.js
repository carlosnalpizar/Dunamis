import { Router } from 'express';
import { consultarDeduccionesPorLey, 
    consultarEmpleados, 
    consultarEmpleadosActivos, 
    consultarEmpleadosConMasTrabajosExtra, 
    consultarEmpleadosInactivos, 
    consultarLongevidadEmpleados, 
    consultarPagosDeHoy, 
    consultarSalariosActuales, 
    consultarTrabajosExtrasRealizados, 
    montosSalarioTotal} from '../models/reportes.model.js';

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
routerReportes.get('/deduccionesley', consultarDeduccionesPorLey);
routerReportes.get('/trabajosextras', consultarTrabajosExtrasRealizados);
routerReportes.get('/masExtras', consultarEmpleadosConMasTrabajosExtra);
routerReportes.get('/pagosHoy', consultarPagosDeHoy);
routerReportes.get('/montos', montosSalarioTotal);

export default routerReportes;