import express, { urlencoded, json } from "express";
import TestRoutes from './routes/test.routes.js'

const app = express();

//Configuración
app.set('port', process.env.PORT || 3030);

//Middleware
app.use(urlencoded({ extended: false }));
app.use(json());

app.use(TestRoutes);

export default app;