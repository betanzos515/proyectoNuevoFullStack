import e from "express";
import Veterinario from "../models/Veterinario.js";

const registrar = async (req, res)=>{
    const { email } = req.body;
    const existeUsuario = Veterinario.findOne({ email });
    if(existeUsuario){
        const error = new Error('El usuario ya está registrado');
        return res.status(400).json({ msg: error.message });
    }
    //vamos a prevenir insertar usuarios duplicados.
    Veterinario.find()

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
    res.json({ msg:'Mostrando perfil...' });
}

export {
    registrar,
    perfil
}; 