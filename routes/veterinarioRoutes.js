import express from 'express';
import { 
registrar,
perfil,
confirmar,
autenticar,
olvidePassword,
comprobarToken,
nuevoPassword

} from '../controllers/veterinarioController.js';
import checkAuth from '../middleware/authMiddleware.js';

/* 
    Para poder iniciar con el router, tenemos que traer la opcion de routing desde expres y 
    eso lo hacemos con express.Route();
*/
const router = express.Router();

/************************** Rimas Publicas ***********************************/

router.post('/registrar',registrar);
router.get('/confirmar/:token',confirmar);
router.post('/login',autenticar);  
router.post('/olvide-password', olvidePassword);
router.route('/olvide-password/:token').get(comprobarToken).post(nuevoPassword)
/*
 Para este caso tenemos dos rutas, las cuales tiene dos verbos diferentes una
 es pos y la otra es get, cada una dispara una accion diferente, para eso podemos 
 simplificarlo como se muestra en la linea 26.

router.get('/olvide-password/:token', comprobarToken);
router.post('/olvide-password/:token', nuevoPasswrod);
*/


/*************************************************************/

/* 
    En el caso de estás rutas estarán protegidas por el middleware de chechAuth 
    este es un middleware que nosotros creamos para validar el token de quien inició sesion
    y en caso de ser válido ejecutamos las consultas del controlador de perfil.
*/

router.get('/perfil', checkAuth, perfil);

export default router;  