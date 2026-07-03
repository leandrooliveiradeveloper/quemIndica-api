import {json, Router} from 'express';
import SelecaoController from './app/controllers/SelecaoController.js';
import UsuarioController from './app/controllers/UsuarioController.js';
import CategoriaController from './app/controllers/CategoriaController.js';
import ProfissionalController from './app/controllers/ProfissionalController.js';

import multer from 'multer';

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

//CATEGORIA
routers.post('/Categoria/Cadastrar', CategoriaController.create);
routers.get('/Categoria/ObterId/:id', CategoriaController.getId);
routers.get('/Categoria/ObterTodos', CategoriaController.GetAll);
routers.put('/Categoria/Update/:id', CategoriaController.update);
routers.get('/Categoria/ObterTodosByProfissional/:id', CategoriaController.GetAllByProfissional);

//PROFISSIONAL
routers.post('/Profissional/Cadastrar', ProfissionalController.create);
routers.get('/Profissional/ObterId/:id', ProfissionalController.getId);
routers.put('/Profissional/Update/:id', ProfissionalController.update);
routers.get('/Profissional/ObterByUsuario/:id', ProfissionalController.getByUsuarioId);





//UPLOAD DA IMAGEM
// configuração do multer
 const storage = multer.diskStorage({
   destination: function (req, file, cb) {
     cb(null, 'src/imagens/'); // pasta onde salvar
   },
   filename: function (req, file, cb) {
     cb(null, file.originalname); // nome único
   }
 });
 const upload = multer({ storage });

routers.put('/Profissional/UpdateImagem', upload.single('imagem'), (req, res) => {
  ProfissionalController.updateImagem(req, res);
});





export default routers;
