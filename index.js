//const express = require('express'); COMMON JS
//para habilitar los módulos se tiene que agregar el type desde package.json
//en node si vamos a exportar un modulo creado por nosotros tenemos que incluir la extencion .js
// dotenv dependiencia que nos permite leer las variables de entorno.
import expres from 'express';
import conectarDB from './config/db.js'; 
import dotenv from 'dotenv'; 
import veterinarioRoutes from './routes/veterinarioRoutes.js';
import pacienteRoutes from './routes/pacienteRoutes.js';
const app = expres();

/* 
    para poder leer los datos que el usuario nos envia en el 
    cuerpo o body de la petición, requerimos habilitar la funcionalidad en express
*/

app.use(expres.json());

//con esto permitimos que dotenv pueda escanear las variables de entorno.
dotenv.config(); 

conectarDB(); //mandamos a llamar a la conexion de BD.

/* app.use('/',( req, res )=>{
    res.send('Hola mundo');
});
*/

//agregamos las rutas de los veterinarios.
app.use('/api/veterinarios',veterinarioRoutes);
app.use('/api/pacientes',pacienteRoutes);
const port = process.env.port || 4000;
app.listen(port,()=>{
     console.log(`Escuchanding en : ${port}...!!`);
}); 




