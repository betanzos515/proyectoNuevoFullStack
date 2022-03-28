import jwt from 'jsonwebtoken';

const generarJWT = (idUsuario)=>{
   
    /* 
        Esta funcion nos genera el token haciendo llamadas el método signIn.
        parametros: 
            1.- Informacion que va a contener el token. { nombre: 'David' }
            2.- Mandamos a llamar a la palabra secreta en las variables de entorno ( process.env.JWT_SECRET JWT_SECRET)
            3.- Objeto de configuraciones extras por ejemplo el tiempo de expiracion del token
    */

    return jwt.sign({ idUsuario }, process.env.JWT_SECRET,{
        expiresIn: '30d'
    });
}

export default generarJWT;