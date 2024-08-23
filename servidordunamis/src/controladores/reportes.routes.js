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
import { consultarComprobantePorPago, consultarDeduccionesAPago, consultarPagosHechosEsteMes, consultarPagosXEmpleado, consultarSalarioBruto, consultarTrabajosExtrasPorEmpleado } from '../models/consultas.model.js';

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

routerReportes.get('/texempleado/:ced', consultarTrabajosExtrasPorEmpleado);
routerReportes.get('/pagosxempleado/:ced', consultarPagosXEmpleado);
routerReportes.get('/salariobruto/:ced', consultarSalarioBruto);
routerReportes.get('/comprobante/:id', consultarComprobantePorPago);
routerReportes.get('/deduccionespago/:id', consultarDeduccionesAPago);
routerReportes.get('/pagosmes', consultarPagosHechosEsteMes);

export default routerReportes;