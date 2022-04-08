import { Router } from "express";
import User from "../../models/User.js";

const router = Router();

router.put('/update', (req, res) => {
    User.findByIdAndUpdate(req.body.id, { "datosJuego.jugadas": 20 }, (error, user) => {
        if (error) return res.send(error)
        return res.send(user);
    })
});

export default router;