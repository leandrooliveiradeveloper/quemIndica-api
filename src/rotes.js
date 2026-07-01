import {Router} from 'express';
import SelecaoController from './app/controllers/SelecaoController.js';
import UsuarioController from './app/controllers/UsuarioController.js';

const routers = Router();

//ROTAS
routers.get('/selecoes', SelecaoController.index);
routers.get('/selecoes/:id', SelecaoController.show);
routers.post('/selecoes', SelecaoController.store);
routers.delete('/selecoes/:id', SelecaoController.delete);
routers.put('/selecoes/:id', SelecaoController.update); 

//USUARIO
routers.post('/Usuario/CadastrarUsuario', UsuarioController.create);
routers.get('/Usuario/ObterUsuario/:id', UsuarioController.getId);
routers.post('/Usuario/Login', UsuarioController.login);
routers.put('/Usuario/Update/:id', UsuarioController.update);

export default routers;
