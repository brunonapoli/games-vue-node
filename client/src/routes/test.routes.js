import { Router } from 'express';
import User from '../../models/User.js';
import jwt from 'jsonwebtoken';

const router = Router();

router.get('/signup', (req, res) => {
    try {
        res.send('Probando')
    } catch (error) {
        console.log(error)
    }
});

router.post('/signup', (req, res) => {
    const nuevoUsuario = new User({
        usuario: req.body.usuario,
        mail: req.body.mail,
        contraseña: req.body.contraseña
    })
    nuevoUsuario.save(error => {
        if (error) {
            console.log('Este mail ya existe')
            return res.status(400).json({
                titulo: 'Error',
                error: 'Mail en uso'
            });
        }
        console.log('Registro exitoso');
        return res.status(200).json({
            titulo: 'Registro exitoso'
        });
    })
    console.log(nuevoUsuario)
});

router.post('/login', (req, res) => {
    User.findOne({ mail: req.body.mail }, (error, user) => {
        //Si ocurre un error en el servidor o externo.
        if (error) {
            console.log('Error en el servidor.')
            return res.status(500).json({
                titulo: 'Error en el servidor.',
                error: error
            })
        }
        //Si no se encuentra el usuario
        if (!user) {
            console.log('Usuario no encontrado.')
            return res.status(401).json({
                titulo: 'Usuario no encontrado.',
                error: 'Datos erróneos.'
            })
        }
        //Contraseña incorrecta
        if (req.body.contraseña != user.contraseña) {
            return res.status(401).json({
                titulo: 'Contraseña incorrecta.',
                error: 'Datos erróneos.'
            })
        }
        //Si los datos ingresados están correctos
        let token = jwt.sign({ idUsuario: user._id }, 'secreto');
        return res.status(200).json({
            titulo: 'Login exitoso',
            token: token
        })
    })
})

export default router;