
import express from 'express';
import cors from 'cors';
import router from '../src/controladores/control.routes.js'; // Asegúrate de usar `default` en la importación


const app = express();

app.use(cors());


app.use(express.json());


app.use(router);

export default app;
