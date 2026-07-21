import UsuarioRepository from '../repositories/UsuarioRepository.js';
import { RequestResponse } from "../model/RequestResponse.js";

class UsuarioController {


    async create(req, res) {

        const response = new RequestResponse();
        response.objeto = null;

        try{
            const row = await UsuarioRepository.create(req.body);
            response.status = 200;
            response.id = row.insertId;
            response.message = "Sucesso";
            response.sucess = true;
        }catch(error){
            response.status = 500;
            response.id = 0;
            response.message = "Error";
            response.sucess = false;
        }
        res.json(response);
    }

     async getId(req, res) {
        const response = new RequestResponse();
        response.objeto = null;
        response.id = 0;
        response.status = 200;
        try{
            const row = await UsuarioRepository.findById(req.params.id);
            
            if(row.length > 0){
                response.id = row.insertId;
                response.message = "Sucesso";
                response.sucess = true;
                response.objeto = row[0];
            }else{
                response.id = row.insertId;
                response.message = "Usuário ou senha inválidos";
            }
        }catch(error){
            response.status = 500;
            response.message = "Error";
        }
        res.json(response);
     }

    async login(req, res) {
        const response = new RequestResponse();
        response.objeto = null;
        response.id = 0;
        response.status = 200;
        response.message = "Não foi possível obter o usuario";
        response.sucess = false;
        try{
            const row = await UsuarioRepository.login(req.body.email, req.body.senha);
            if(row.length > 0){
                response.status = 200;
                response.id = row[0].idusuario;
                response.message = "Sucesso";
                response.sucess = true;
                response.objeto = row[0];
            }else{
                response.status = 200;
                response.message = "Usuário ou senha inválidos";
                response.sucess = false;
                response.objeto = null;
            }
        }catch(error){
            response.status = 500;
            response.id = 0;
            response.message = "Error";
            response.sucess = false;
            response.objeto = null;
        }
        res.json(response);
    }

     async update(req, res) {
        
        const id = req.params.id;
        const usuario = req.body;

        const response = new RequestResponse();
        response.status = 200;
        response.message = "Usuário ou senha inválidos";
        response.sucess = false;
        response.objeto = null;
        response.id = 0;
        try{

            const oldUsuario = await UsuarioRepository.findById(req.params.id);
            console.log("oldUsuario", oldUsuario);
            console.log("usuario", usuario);

            if(oldUsuario.length > 0 && oldUsuario[0].senha === usuario.senha){
                const row = await UsuarioRepository.update(id, usuario);
                if(row.affectedRows > 0){
                    response.id = parseInt(id);
                    response.message = "Sucesso";
                    response.sucess = true;
                    response.objeto = usuario;
                }
            }
        }catch(error){
            response.status = 500;
        }
         res.json(response);
     }

   async createFavorito(req, res) {

        const response = new RequestResponse();
        response.objeto = null;
        console.log("req.body: " + JSON.stringify(req.body));

        const idProfissional = req.body.idprofissional;
        const idusuario = req.body.idusuario;

        try{
            let row = null;
            const rowFavorito = await UsuarioRepository.findFavorito(idProfissional, idusuario);
            console.log("rowFavorito: " + JSON.stringify(rowFavorito));
            if(rowFavorito.length > 0){
                row = await UsuarioRepository.deleteFavorito(idProfissional, idusuario);
                response.sucess = false;
            }else{
                row = await UsuarioRepository.createFavorito(idProfissional, idusuario);
                response.sucess = true;
            }

            response.status = 200;
            response.id = 0;
            response.message = "Sucesso";
        }catch(error){
            response.status = 500;
            response.id = 0;
            response.message = error.message;
            response.sucess = false;
        }
        res.json(response);
    }


    async getFavorito(req, res) {
        const response = new RequestResponse();
        response.objeto = null;
        response.id = 0;
        response.status = 200;

        const idProfissional = req.body.idprofissional;
        const idusuario = req.body.idusuario;

                console.log("idProfissional " + idProfissional);
        console.log("idusuario " + idusuario);

        try{
            const row = await UsuarioRepository.findFavorito(idProfissional, idusuario);
            
            if(row.length > 0){
                response.id = row.insertId;
                response.message = "Sucesso";
                response.sucess = true;
                response.objeto = row[0];
            }else{
                response.id = row.insertId;
                response.sucess = false;
                response.message = "Este profisional não está selecionado como favorito";
            }
        }catch(error){
            response.status = 500;
            response.message = "Error";
        }
        res.json(response);
     }

    async GetAll(req, res) {
        console.log("USUARIO GETALL");
        const rows = await UsuarioRepository.findAll();
        res.json(rows);
    }
    

}

export default new UsuarioController();
