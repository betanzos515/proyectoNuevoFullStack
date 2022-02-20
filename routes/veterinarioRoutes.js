import express, { response } from 'express';
import { registrar,perfil } from '../controllers/veterinarioController.js';

/* 
    Para poder iniciar con el router, tenemos que traer la opcion de routing desde expres y 
    eso lo hacemos con express.Route();
*/
const router = express.Router();

router.post('/registrar',registrar);

router.get('/perfil',perfil);




export default router;