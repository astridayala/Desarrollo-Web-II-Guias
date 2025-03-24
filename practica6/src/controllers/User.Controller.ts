import { Request, Response } from "express";
import User from "../models/Users";
import { hashPassword, validatePassword } from "../utils/auth";
import { validationResult } from "express-validator";

export const createAccount = async(req:Request, res:Response) => {
    let errors = validationResult(req)
    console.log(errors)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }

    const { name, password, email, username } = req.body;

    const userExist = await User.findOne({ email });
    if (userExist) {
        res.status(409).json({ message:"User already exists for this email" });
        return;
    }

    const userNameExists = await User.findOne({ username });
    if (userNameExists) {
        res.status(409).json({ message:"Username already exists" });
        return;
    }
    
    const user = new User(req.body);
    user.password = await hashPassword(password);
    await user.save();
    res.status(201).json({ message: 'Datos del usuario recibidos con exito' });
}

export const login = async(req:Request, res:Response) => {
    //valida errores de la solicitud
    let errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    //extrae email y password de la solicitud
    const {email, password} = req.body
    //busca usuario en BD
    const user = await User.findOne({email})
    if(!user){
        const error = new Error('Invalid credencials')
        return res.status(401).json({error:error.message})
    }
    //comprueba si password es correcto
    const isPasswordCorrect = await validatePassword(password, user.password)
    if(!isPasswordCorrect){
        const error = new Error('Invalid credentials')
        return res.status(401).json({error:error.message})
    }
    //si todo correcto, enviar respuesta de autenticacion exitosa
    res.status(200).send('Authenticated')
}