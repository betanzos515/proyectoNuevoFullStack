import jwt from 'jsonwebtoken'; //importamos jwt para comprobar el token
import Veterinario from '../models/Veterinario.js';

const checkAuth = async ( req, resp, next )=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            
            /*
            
            req.veterinario es una forma de crear una sesion con los datos que esta consulta 
            nos arroje.
    
            .select('-password') con esto le pedimos todos los datos menos el password si quisieamos evitar el token pudieramos 
            realizarlo junto con el password .select('-passwrod  -token  -confirmado') etc.
    
            */
           
            req.veterinario = await Veterinario.findById(decoded.idUsuario).select('-password -token -confirmado'); 

        } catch (error) {
            const err = new Error('Token no valido');
            resp.status(403).json({ msg: err.message });
        }
    }
    if(!token){
        const error = new Error('Token no valido o inexistente');
        resp.status(403).json({ msg: error.message });
    }
    next();
}

export default checkAuth