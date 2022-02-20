//const express = require('express'); COMMON JS

//para habilitar los módulos se tiene que agregar el type desde package.json
import expres from 'express';
import conectarDB from './config/db.js'; //en nonde si vamos a exportar un modulo creado por nosotros tenemos que incluir la extencion .js
import dotenv from 'dotenv'; // dotenv dependiencia que nos permite leer las variables de entorno.
import veterinarioRoutes from './routes/veterinarioRoutes.js';
const app = expres();
/* 
    para poder leer los datos que el usuario nos envia en el 
    cuerpo o body de la petición, requerimos habilitar la funcionalidad en express
*/
app.use(expres.json());

dotenv.config(); //con esto permitimos que dotenv pueda escanear las variables de entorno.



conectarDB(); //mandamos a llamar a la conexion de BD.

/* app.use('/',( req, res )=>{
    res.send('Hola mundo');
});
*/

//agregamos las rutas de los veterinarios.
app.use('/api/veterinarios',veterinarioRoutes);

app.listen(4000,()=>{
     console.log('Escuchanding...!!');
}); 




