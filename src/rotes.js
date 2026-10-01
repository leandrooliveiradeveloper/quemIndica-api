import {json, Router} from 'express';
import SelecaoController from './app/controllers/SelecaoController.js';
import UsuarioController from './app/controllers/UsuarioController.js';
import CategoriaController from './app/controllers/CategoriaController.js';
import ProfissionalController from './app/controllers/ProfissionalController.js';
import multer from 'multer';
import AvaliacaoController from './app/controllers/AvaliacaoController.js';

const routers = Router();

//USUARIO
routers.post('/Usuario/CadastrarUsuario', UsuarioController.create);
routers.get('/Usuario/ObterUsuario/:id', UsuarioController.getId);
routers.post('/Usuario/Login', UsuarioController.login);
routers.put('/Usuario/Update/:id', UsuarioController.update);
routers.post('/Usuario/FavoritarProfissional', UsuarioController.createFavorito);
routers.post('/Usuario/ObterFavorito', UsuarioController.getFavorito);
routers.get('/Usuario/ObterTodos', UsuarioController.GetAll);
routers.post('/Usuario/RecuperarSenha', UsuarioController.RecuperarSenha);
routers.post('/Usuario/AlterarSenha', UsuarioController.AlterarSenha);

//CATEGORIA
routers.post('/Categoria/Cadastrar', CategoriaController.create);
routers.get('/Categoria/ObterId/:id', CategoriaController.getId);
routers.get('/Categoria/ObterTodosAtivos', CategoriaController.GetAllAtivos);
routers.get('/Categoria/ObterTodos', CategoriaController.GetAll);
routers.put('/Categoria/Update/:id', CategoriaController.update);
routers.get('/Categoria/ObterTodosByProfissional/:id', CategoriaController.GetAllByProfissional);
routers.delete('/Categoria/DeleteById/:id', CategoriaController.DeleteById);

//PROFISSIONAL
routers.post('/Profissional/Cadastrar', ProfissionalController.create);
routers.get('/Profissional/ObterId/:id', ProfissionalController.getId);
routers.put('/Profissional/Update/:id', ProfissionalController.update);
routers.get('/Profissional/ObterByUsuario/:id', ProfissionalController.getByUsuarioId);
routers.get('/Profissional/ObterByFavoritos/:id', ProfissionalController.findAllFavoritoToCard);
routers.put('/Profissional/updateCliques/:id', ProfissionalController.updateCliques);
routers.get('/Profissional/ObterClicados', ProfissionalController.findAllClicados);

routers.get('/Profissional/ObterTodos', ProfissionalController.GetAll);
routers.get('/Profissional/ObterTodosCard', ProfissionalController.findAllToCard);
routers.get('/Profissional/ObterPerfil/:id', ProfissionalController.findToPerfil);


//AVALIACAO
routers.post('/Avaliacao/Cadastrar', AvaliacaoController.create);
routers.get('/Avaliacao/ObterId/:id', AvaliacaoController.getId);
routers.get('/Avaliacao/ObterIdProfissional/:id', AvaliacaoController.getByIdProfissional);
routers.delete('/Avaliacao/DeleteById/:id', AvaliacaoController.DeleteById);




//UPLOAD DA IMAGEM
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }
});

routers.put('/Profissional/UpdateImagem', upload.single('imagem'), (req, res) => {
  ProfissionalController.updateImagem(req, res);
});

routers.delete('/Profissional/RemoverImagem/:id', ProfissionalController.RemoverImagem);



//UPLOAD DA IMAGEM
const storageCategoria = multer.memoryStorage();
const uploadCategoria = multer({
  storage: storageCategoria,
  limits: { fileSize: 10 * 1024 * 1024 }
});

routers.put('/Categoria/UpdateImagem', uploadCategoria.single('imagem'), (req, res) => {
  CategoriaController.updateImagem(req, res);
});


export default routers;
