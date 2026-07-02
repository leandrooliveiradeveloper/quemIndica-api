import ProfissionalRepository from '../repositories/ProfissionalRepository.js';
import { RequestResponse } from "../model/RequestResponse.js";
import UsuarioController from './UsuarioController.js';
import UsuarioRepository from '../repositories/UsuarioRepository.js';

class ProfissionalController {

    async create(req, res) {

        const response = new RequestResponse();
        response.objeto = null;
        response.id = 0;
        response.message = "Error";
        response.sucess = false;

        try{

            const usuario = req.body.usuario;
            const profissional = req.body;

            const newUsuario = await UsuarioRepository.create(usuario);
            profissional.idusuario = newUsuario.insertId;

            if(profissional.idusuario > 0){
            console.log("Profissional: " + profissional);

            const profissionalCreate = {
                descricao: profissional.descricao, 
                uriImagemPrincipal: profissional.uriImagemPrincipal,
                telefone: profissional.telefone,
                disponibilidadeInicio: profissional.disponibilidadeInicio,
                disponibilidadeFim: profissional.disponibilidadeFim,
                avaliacaoMedia: profissional.avaliacaoMedia,
                servico: profissional.servico,
                rua: profissional.rua,
                numero: profissional.numero,
                bairro: profissional.bairro,
                estado: profissional.estado,
                cidade: profissional.cidade,
                latitude: profissional.latitude,
                idusuario: profissional.idusuario
            };
            
            const newProfissional = await ProfissionalRepository.create(profissionalCreate);
            console.log("newProfissional: " + newProfissional);

            response.status = 200;
            response.id = newUsuario.insertId;
            response.message = "Sucesso";
            response.sucess = true;
            response.objeto = profissionalCreate
        }

        }catch(error){
            response.status = 500;
            response.message = error;
        }
        res.json(response);
    }

     async getId(req, res) {
        const response = new RequestResponse();
        response.objeto = null;
        response.id = 0;
        response.status = 200;
        try{
            const row = await ProfissionalRepository.findById(req.params.id);
            
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

    async getByUsuarioId(req, res) {
        const response = new RequestResponse();
        response.objeto = null;
        response.id = 0;
        response.status = 200;
        try{
            const row = await ProfissionalRepository.findByUsuarioId(req.params.id);
            
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


     async update(req, res) {
        
        const id = req.params.id;
        const profissional = req.body;
        const usuario = req.body.usuario;

        const response = new RequestResponse();
        response.status = 200;
        response.message = "";
        response.sucess = false;
        response.objeto = null;
        response.id = 0;
        try{

            console.log("=================================================");
            console.log("Profissional: " + JSON.stringify(profissional));
            console.log("=================================================");
            console.log("usuario: " + JSON.stringify(usuario));
            console.log("=================================================");

            const oldUsurio = await UsuarioRepository.findById(usuario.id);
            const oldProfissional = await ProfissionalRepository.findById(req.params.id);

            // console.log("oldProfissional: " + JSON.stringify(oldProfissional));
            // console.log("=================================================");

            const usuarioUpdate = oldUsurio[0];
            usuarioUpdate.nome = usuario.nome;
            usuarioUpdate.email = usuario.email;       
            usuarioUpdate.dataCadastro = usuario.dataCadastro; 

             const profissionalUpdate = {
                 idprofissional: profissional.id,
                 descricao: profissional.descricao, 
                 uriImagemPrincipal: profissional.uriImagemPrincipal,
                 telefone: profissional.telefone,
                 disponibilidadeInicio: profissional.disponibilidadeInicio,
                 disponibilidadeFim: profissional.disponibilidadeFim,
                 avaliacaoMedia: profissional.avaliacaoMedia,
                 servico: profissional.servico,
                 rua: profissional.rua,
                 numero: profissional.numero,
                 bairro: profissional.bairro,
                 estado: profissional.estado,
                 cidade: profissional.cidade,
                 latitude: profissional.latitude
             };

             if(oldProfissional.length > 0 && oldUsurio[0].senha === usuario.senha){

                console.log("=================  ENTROU  ======================");
            
                const rowUsuario = await UsuarioRepository.update(usuario.id, usuarioUpdate);

                console.log("rowUsuario: " + JSON.stringify(rowUsuario));
                
                const row = await ProfissionalRepository.update(profissional.id, profissionalUpdate);

                // console.log("=================================================");
                // console.log("rowUsuario: " + JSON.stringify(rowUsuario));
                // console.log("=================================================");
                // console.log("row: " + JSON.stringify(row));
                // console.log("=================================================");
                 
                  if(row.affectedRows > 0){
                      response.id = parseInt(id);
                      response.message = "Sucesso";
                      response.sucess = true;
                      response.objeto = profissional;
                  }
             }
        }catch(error){
            response.status = 500;
            response.message = error;
        }
         res.json(response);
     }

}

export default new ProfissionalController();
