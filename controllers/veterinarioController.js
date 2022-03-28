import Veterinario from "../models/Veterinario.js";
import generarJWT from '../helpers/JWT.js';
import generarId from "../helpers/generarId.js";


const registrar = async (req, res)=>{
    const { email } = req.body;
    //vamos a prevenir insertar usuarios duplicados.
    const existeUsuario = await Veterinario.findOne({ email });
    if(existeUsuario){
        enviarError('El usuario ya está registrado',400,res);
    }
    try{
        //guardamos un nuevo veterinario.
        const veterinario = Veterinario(req.body);
        const veterinarioGuardado = await veterinario.save();
        res.json(veterinarioGuardado);
    }catch(error){
        console.log(error);
    }
}

const perfil = (req, res)=>{
    const { veterinario } = req;
    res.json({ perfil: veterinario }); 
}

const confirmar = async (req, res)=>{
    //con esta linea accedemos a los parametros de la url a la que se envia la consulta = req.params.token;
    const { token } = req.params;
    const usuarioConfirmado = await Veterinario.findOne({ token });
    if(!usuarioConfirmado){
        enviarError('Envia un token válido',400,res);
    }
    try {
        usuarioConfirmado.token = '',
        usuarioConfirmado.confirmado = true;
        await usuarioConfirmado.save(); 
        res.json({ msg:'Usuario confirmado correctamente...' });
    } catch (error) {
        console.log(error);
    }
}

const autenticar = async (req, res)=>{
    const { email, password } = req.body;
    const usuario = await Veterinario.findOne({ email }); 
    if(!usuario){
        enviarError('El usuario no existe',404,res);
    }
    if(!usuario.confirmado){
        enviarError('Tu cuenta no ah sido confirmada',404,res);
    }

    if(await usuario.comprobarPassword(password)){
        res.json({ token: generarJWT(usuario.id) })
    }else{
        enviarError('El password es incorrecto',404,res);
    }
}

const olvidePassword = async (req, res)=>{
    const { email } = req.body;
    const existeVeterinario = await Veterinario.findOne({ email }) ;
    if(!existeVeterinario){
        enviarError('El usuario no existe',404,res);
    }
    try {
         existeVeterinario.token = generarId();
         await existeVeterinario.save();
         res.json({ msg: 'Hemos enviado un email con las instrucciones' });
    } catch (error) {
        console.log(error);
    }
}

const comprobarToken = async (req, res)=>{
    const { token } = req.params;
    const tokenValido = await Veterinario.findOne({ token });
    if(tokenValido){
        //El token es valido el usuario existe.
        res.json({ msg:'Token valido y el usuario existe' });
    }else{
        enviarError('Token no valid',404,res);
    }
}

const nuevoPassword = async (req, res)=>{
    const { token } = req.params;
    const { password } = req.body;

    const veterinario = await Veterinario.findOne({ token });

    if(!veterinario){
        enviarError('Hubo un error',404, res);
    }
    if(password){
        try {
            veterinario.token = null;
            veterinario.password = password;
            await veterinario.save();
            res.json({ msg:'Password modificado correctamente' });
        } catch (error) {
            console.log(error);
        }
    }else{
        enviarError('El password está vacio',400,res);
    }
}

//creamos una funcion para el retorno de errores
const enviarError = (mensaje, status=400, res)=>{
    const error = new Error(mensaje);
    return res.status(status).json({ msg: error.message });
}

export {
    registrar,
    perfil,
    confirmar,
    autenticar,
    olvidePassword,
    comprobarToken,
    nuevoPassword
}; 