import {json, Router} from 'express';
import SelecaoController from './app/controllers/SelecaoController.js';
import UsuarioController from './app/controllers/UsuarioController.js';
import CategoriaController from './app/controllers/CategoriaController.js';
import ProfissionalController from './app/controllers/ProfissionalController.js';
import multer from 'multer';

const routers = Router();

//USUARIO
routers.post('/Usuario/CadastrarUsuario', UsuarioController.create);
routers.get('/Usuario/ObterUsuario/:id', UsuarioController.getId);
routers.post('/Usuario/Login', UsuarioController.login);
routers.put('/Usuario/Update/:id', UsuarioController.update);
routers.post('/Usuario/FavoritarProfissional', UsuarioController.createFavorito);
routers.post('/Usuario/ObterFavorito', UsuarioController.getFavorito);

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
routers.get('/Profissional/ObterByFavoritos/:id', ProfissionalController.findAllFavoritoToCard);


routers.get('/Profissional/ObterTodos', ProfissionalController.GetAll);
routers.get('/Profissional/ObterTodosCard', ProfissionalController.findAllToCard);
routers.get('/Profissional/ObterPerfil/:id', ProfissionalController.findToPerfil);







//UPLOAD DA IMAGEM
 const storage = multer.diskStorage({
   destination: function (req, file, cb) {
    //  cb(null, 'src/imagens/temp/');
    const outputDir = process.env.UPLOAD_DIR_IMAGENS;
    cb(null, outputDir + '/temp');
   },
   filename: function (req, file, cb) {
     cb(null, file.originalname);
   }
 });
 const upload = multer({ storage });

routers.put('/Profissional/UpdateImagem', upload.single('imagem'), (req, res) => {
  // console.log("rotes UpdateImagem: " + JSON.stringify(req));
  ProfissionalController.updateImagem(req, res);
});

routers.delete('/Profissional/RemoverImagem/:id', ProfissionalController.RemoverImagem);




export default routers;
