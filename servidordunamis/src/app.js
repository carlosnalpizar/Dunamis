import express from 'express';
import router from '../src/controladores/control.routes.js' // Nota: usa `default` en la importación

const app = express();
app.use(router);

export default app;
