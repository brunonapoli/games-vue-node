import express, { urlencoded, json } from "express";
import SignupRoute from './routes/signup.routes.js';
import Login from './routes/login.routes.js';
import Usuario from './routes/usuario.routes.js';
import cors from "cors";  //Instalo cors para que me permita enviar datos a mi servidor sin seguridad
import mongoose from "mongoose";

const app = express();

//Configuración
app.set('port', process.env.PORT || 3030);
mongoose.connect('mongodb+srv://game:ty7ZjVrCL0x44MEl@game.wp3xc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

//Middleware
app.use(urlencoded({ extended: false }));
app.use(json());
app.use(cors());

//Rutas
app.use(SignupRoute);
app.use(Login);
app.use(Usuario);

export default app;