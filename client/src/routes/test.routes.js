import { Router } from 'express';

const router = Router();

let datos = [];

router.get('/login', (req, res) => {
    res.send(datos)
});

router.post('/login', (req, res) =>{
    console.log(req.body);
    datos.push(req.body);
    console.log(datos);
});

export default router;