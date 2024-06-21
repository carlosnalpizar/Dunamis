import { Router } from 'express';
import { borrarPersona, crearPersona, getPersona, getPersonas, modificarPersona } from '../models/personas.model.js';


const router = Router();

//personas
router.get('/persona', getPersonas);
router.get('/persona/:id', getPersona)
router.delete('/persona/:id', borrarPersona)
router.put('/persona/:id', modificarPersona)
router.post('/persona', crearPersona)
//personas

















export default router;