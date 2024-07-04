import express from 'express';
import cors from 'cors';
import routerEmpleados from '../src/controladores/empleados.routes.js'; // Asegúrate de usar `default` en la importación
import routerUsuarios from '../src/controladores/usuarios.routes.js'
import routerBitacoras from '../src/controladores/bitacoras.routes.js'

const app = express();

app.use(cors());


app.use(express.json());

//LLamado de los controladores
app.use(routerEmpleados);
app.use(routerUsuarios);
app.use(routerBitacoras);

export default app;
