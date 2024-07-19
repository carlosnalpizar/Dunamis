import { Router } from 'express';
import { borrarPersona, 
    crearEmpleado,
    getEmpleados,
    getPersona,
    agregarTrabajos, 
    modificarEmpleado} from '../models/empleados.model.js';

/*
El uso de controladores funciona por rutas, cada vez que el servidor recibe una peticion HTTP
el controlador (llamado router en EXPRESS) la clasifica segun el tipo de peticion y segun el 
tipo de ruta que  se le solicita desde el API del cliente; el controlador ejecutara
el metodo que está relacionado con la ruta
*/

const routerEmpleados = Router();

routerEmpleados.get('/persona', getEmpleados);
routerEmpleados.get('/persona/:id', getPersona);
routerEmpleados.delete('/persona/:id', borrarPersona);
routerEmpleados.put('/persona/:id/trabajos', agregarTrabajos);
routerEmpleados.put('/persona/:id', modificarEmpleado);  // Agregar esta línea
routerEmpleados.post('/persona', crearEmpleado);

export default routerEmpleados;
