import { Router } from 'express';
import User from '../../models/User.js';
import jwt from 'jsonwebtoken';

const router = Router();

router.get('/usuario', (req, res) => {
    let token = req.headers.token
    jwt.verify(token, 'tokenSecreto', (error, decoded) => {
        if (error) {
            return res.status(401).json({
                titulo: 'No autorizado'
            })
        }
        //Si el token está verificado
        User.findOne({ _id: decoded.idUsuario }, (error, user) => {
            if (error) return console.log(error)
            console.log(user)
            return res.status(202).json({
                titulo: 'Datos usuario almacenados',
                user: {
                    id: user._id,
                    usuario: user.usuario,
                    mail: user.mail,
                    datosJuego: {
                        jugadas: user.datosJuego.jugadas,
                        ganadas: user.datosJuego.ganadas,
                        perdidas: user.datosJuego.perdidas,
                        rondas: user.datosJuego.rondas
                    }
                }
            })
        })
    })
});

export default router;