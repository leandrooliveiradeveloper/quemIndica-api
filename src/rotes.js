import {Router} from 'express';
import SelecaoController from './app/controllers/SelecaoController.js';

const routers = Router();

//ROTAS
routers.get('/selecoes', SelecaoController.index);
routers.get('/selecoes/:id', SelecaoController.show);
routers.post('/selecoes', SelecaoController.store);
routers.delete('/selecoes/:id', SelecaoController.delete);
routers.put('/selecoes/:id', SelecaoController.update); 

export default routers;
