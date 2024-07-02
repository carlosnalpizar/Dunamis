import { Router } from 'express';
import { borrarPersona, crearEmpleado, getEmpleados, getPersona, modificarPersona } from '../models/empleados.model.js';
import { crearUsuario, getUsuarios } from '../models/usuarios.model.js';
import { getBitacoras } from '../models/bitacora.model.js';


const router = Router();

//empleados
router.get('/persona', getEmpleados);
router.get('/persona/:id', getPersona)
router.delete('/persona/:id', borrarPersona)
router.put('/persona/:id', modificarPersona)
router.post('/persona', crearEmpleado)


//usuarios
router.post('/usuario', crearUsuario)
router.get('/usuario', getUsuarios);

//bitacora
router.get('/bitacora', getBitacoras);















export default router;