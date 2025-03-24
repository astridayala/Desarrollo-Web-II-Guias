import argon2 from "argon2";

//genera un hash seguro para una contrasenia en texto plano
export async function hashPassword(plainPassword:string): Promise<string>{
    return await argon2.hash(plainPassword);
}

//valida si la contrasenia en texto plano coindice con la encriptada
export async function validatePassword(plainPassword:string, hashedPassword:string): Promise<boolean> {
    return await argon2.verify(hashedPassword, plainPassword);
}