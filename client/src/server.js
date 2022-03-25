import express, { urlencoded, json } from "express";

const app = express();

//Configuración
app.set('port', process.env.PORT || 3030);

//Middleware
app.use(urlencoded({ extended: false }));
app.use(json());

export default app;