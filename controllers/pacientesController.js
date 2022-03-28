import Paciente from "../models/Paciente.js";

const agregarPaciente = async (req, res)=>{
     
    const paciente = new Paciente(req.body);
    try {
        paciente.veterinario = req.veterinario._id;
        const pacienteAlmacenado = await paciente.save();
        res.json({ pacienteAlmacenado });
    } catch (error) {
        
    }
}

const obtenerPacientes = async (req, res)=>{
    const veterinario = req.veterinario;
    const pacientes =  await Paciente.find().where('veterinario').equals(veterinario._id);
    res.json({ pacientes });
}

const obtenerPaciente = async (req, res)=>{
    const { id } = req.params;
    try {
        const paciente = await Paciente.findById(id);
        if(req.veterinario._id.toString() !== paciente.veterinario.toString()){
            res.json({ msg: 'Accion no valida' });
            console.log('Accion no valida');
        }

       if(paciente){
           res.json({ msg: paciente });
        }        

    }catch(error){
        res.json({ msg: error.message });
    }
} 

const actualizarPaciente = (req, res)=>{
    const { id } =  req.params;
    const paciente = Paciente.findById(id);

    if(!paciente){
        return res.json({ msg:'Paciente no encontrado' });
    }

    if(req.veterinario._id.toString() !== paciente.veterinario.toString()){
        res.json({ msg: 'Accion no valida' });
    }

   if(paciente){
       res.json({ msg: paciente });
    }    
}

const eliminarPaciente = (req, res)=>{
    console.log('Desde eliminarPaciente');
}

export {
    agregarPaciente,
    obtenerPacientes,
    obtenerPaciente,
    actualizarPaciente,
    eliminarPaciente
}

