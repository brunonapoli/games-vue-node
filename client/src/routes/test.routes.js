import { Router } from 'express';
import User from '../../models/User.js';

const router = Router();

router.get('/login', (req, res) => {
    try {
        res.send('Probando')
    } catch (error) {
        console.log(error)
    }
});

router.post('/login', (req, res) =>{
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
        } else {
            console.log('Registro exitoso');
            return res.status(200).json({
                titulo: 'Registro exitoso'
            });
        }
    })
    console.log(nuevoUsuario)
});

export default router;