import moongose from 'mongoose';
const { Schema } = moongose;

const userSchema = new Schema({
    usuario: String,
    mail: String,
    contraseña: {
        unique: true,
        type: String
    }
});

const User = moongose.model('User', userSchema);

export default User;