import { Router } from "express";
import User from "../../models/User.js";

const router = Router();

router.put('/update', (req, res) => {
    console.log(req.body)
    User.findByIdAndUpdate(req.body.id, { 
        "datosJuego.jugadas": req.body.datosJuego.jugadas, 
        "datosJuego.ganadas": req.body.datosJuego.ganadas, 
        "datosJuego.perdidas": req.body.datosJuego.perdidas, 
        "datosJuego.rondas": req.body.datosJuego.rondas 
        }, 
        (error, user) => {
        if (error) return res.send(error)
        return res.send(user);
    })
});

export default router;