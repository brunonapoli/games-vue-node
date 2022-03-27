import express, { urlencoded, json } from "express";
import TestRoutes from './routes/test.routes.js';
import cors from "cors";  //Instalo cors para que me permita enviar datos a mi servidor sin seguridad

const app = express();

//Configuración
app.set('port', process.env.PORT || 3030);

//Middleware
app.use(urlencoded({ extended: false }));
app.use(json());
app.use(cors());

//Rutas
app.use(TestRoutes);

export default app;