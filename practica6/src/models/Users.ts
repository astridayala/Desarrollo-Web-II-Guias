import mongoose, { Schema } from "mongoose";

//defina le interfaz para el usuario, asegurando el tipado TYPESCRIPT
interface IUser {
    name: string;
    email: string;
    password: string;
    username: string;
}

//define el esquema del usuario en la BD
const userSchema = new Schema <IUser> ({
    name:{
        type: String,
        required: true, //nombre obligatorio
        trim: true, //elimina espacios en blanco al inicio y final
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    },
    username:{
        type:String,
        required: true,
        unique: true, //unico para evitar duplicados
        trim: true,
        lowercase: true, //convierte el valor a minusculas automaticamente
    },
});

//crea el modelo de usuario basado en el esquema
const User = mongoose.model("User", userSchema);

export default User;