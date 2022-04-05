import moongose from 'mongoose';
const { Schema } = moongose;

const userSchema = new Schema({
    usuario: String,
    mail: { unique: true, type: String},
    contraseña: String,
    datosJuego: {
        jugadas: Number,
        ganadas: Number,
        perdidas: Number,
        rondas: Number
    }
});

const User = moongose.model('User', userSchema);

export default User;