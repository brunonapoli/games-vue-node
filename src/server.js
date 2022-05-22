import express, { urlencoded, json } from "express";
import 'dotenv/config';
import SignupRoute from './routes/signup.routes.js';
import Login from './routes/login.routes.js';
import Usuario from './routes/usuario.routes.js';
import Update from './routes/update.routes.js';
import cors from "cors";  //Instalo cors para que me permita enviar datos a mi servidor sin seguridad
import mongoose from "mongoose";

const app = express();

//Configuración
app.set('port', process.env.PORT || 3030);
const MONGODB_URI = process.env.MONGODB_URI
mongoose.connect(MONGODB_URI);

//Middleware
app.use(urlencoded({ extended: false }));
app.use(json());
app.use(cors());

//Rutas
app.use(SignupRoute);
app.use(Login);
app.use(Usuario);
app.use(Update);

export default app;