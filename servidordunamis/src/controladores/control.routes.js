import { Router } from 'express';
import { borrarPersona, crearEmpleado, getEmpleados, getPersona, modificarPersona } from '../models/personas.model.js';
import { crearUsuario } from '../models/usuarios.model.js';


const router = Router();

//empleados
router.get('/persona', getEmpleados);
router.get('/persona/:id', getPersona)
router.delete('/persona/:id', borrarPersona)
router.put('/persona/:id', modificarPersona)
router.post('/persona', crearEmpleado)


//usuarios
router.post('/usuario', crearUsuario)
















export default router;