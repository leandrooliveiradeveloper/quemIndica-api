import ProfissionalRepository from '../repositories/ProfissionalRepository.js';
import { RequestResponse } from "../model/RequestResponse.js";
import UsuarioRepository from '../repositories/UsuarioRepository.js';
import CategoriaRepository from '../repositories/CategoriaRepository.js';

import multer from 'multer';
import sharp from 'sharp';
import fs from 'fs';

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

            const usuarioCreate = {
                nome: usuario.nome,
                email: usuario.email,
                dataCadastro: usuario.dataCadastro,
                perfil: usuario.perfil,
                senha: usuario.senha,
                status: usuario.status
            }

            const newUsuario = await UsuarioRepository.create(usuarioCreate);
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
                profissionalCreate.id = newProfissional.insertId;
                console.log("newProfissional: " + JSON.stringify(newProfissional));

                console.log("listaCategoria: " + profissional.categorias);
                
                profissional.categorias.forEach(async element => {
                    const adicionarUsuariocategoria = await CategoriaRepository.createByProfissional(newProfissional.insertId, element);
                    console.log("Categoria: " + element);
                    console.log("profissional.id: " + newProfissional.insertId);
                });

                profissionalCreate.id = newProfissional.insertId;
                usuarioCreate.id = newUsuario.insertId;
                profissionalCreate.usuario = usuarioCreate;

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
        response.message = "Usuario não encontrado";
        response.sucess = false;
        response.objeto = null;
        response.id = 0;
        try{

            console.log("=================================================");
            console.log("Profissional: " + JSON.stringify(profissional));
            console.log("=================================================");
            // console.log("usuario: " + JSON.stringify(usuario));
            console.log("=================================================");

            const oldUsurio = await UsuarioRepository.findById(usuario.id);

            if(oldUsurio.length > 0){

                const oldProfissional = await ProfissionalRepository.findById(profissional.id);

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
                
                      const rowUsuario = await UsuarioRepository.update(usuario.id, usuarioUpdate);
                      const row = await ProfissionalRepository.update(profissional.id, profissionalUpdate);
                    
                      const apagarUsuarioCategoria = await CategoriaRepository.deleteByProfissional(profissional.id);
                      profissional.categorias.forEach(async element => {
                          const adicionarUsuariocategoria = await CategoriaRepository.createByProfissional(profissional.id, element);
                      });
                    
                      if(row.affectedRows > 0){
                          response.id = parseInt(id);
                          response.message = "Sucesso";
                          response.sucess = true;
                          response.objeto = profissional;
                      }
                 }
            }
        }catch(error){
            response.status = 500;
            response.message = error;
        }
         res.json(response);
    }

    async updateImagem(req, res) {
        const response = new RequestResponse();
        response.status = 200;
        response.message = "Nenhum arquivo enviado";
        response.sucess = false;
        response.objeto = null;
        response.id = 0;

        try {

              const outputDir = process.env.UPLOAD_DIR_IMAGENS;
              if (!req.file || !fs.existsSync(outputDir)) {
                  response.status = 400;
                  response.message = "Nenhum arquivo enviado";
                  return res.json(response);
              }

              const outputPath = `${outputDir}/${req.file.filename}`;
              const outputPathTemp = `${outputDir}/temp/${req.file.filename}`;

              if(req.file.filename.indexOf(".jpg")){
                  await sharp(req.file.path)
                  .resize({ width: 800 })
                  .jpeg({ quality: 80 })
                  .toFile(outputPath);
              }else{
                  await sharp(req.file.path)
                  .resize({ width: 800 })
                  .png({quality: 80})
                  .toFile(outputPath);
              }

              fs.unlinkSync(outputPathTemp);

              let stats = fs.statSync(outputPath);
              let sizeInMB = stats.size / (1024 * 1024);

              const objeto = {
                  filename: req.file.filename,
                  path: req.file.path,
                  mimetype: req.file.mimetype,
                  size: sizeInMB.toFixed(2)
              };

            //update url na tabela Profissional
            console.log("req.body.id: " + req.body.id);
            console.log("req.file.filename: " + req.file.filename);
            await ProfissionalRepository.updateUrlImagem(req.file.filename, req.body.id);

            response.message = "Upload feito com sucesso";
            response.sucess = true;
            response.objeto = objeto;

            return res.json(response);
        } catch (error) {
            response.status = 500;
            response.message = error.message;
            return res.json(response);
        }
    }

    async RemoverImagem(req, res) {
        const response = new RequestResponse();
        response.status = 200;
        response.message = "Nenhum arquivo enviado";
        response.sucess = false;
        response.objeto = null;
        response.id = 0;

        try {

            console.log("CHAMOU ");

            const outputDir = process.env.UPLOAD_DIR_IMAGENS;

            const row = await ProfissionalRepository.findById(req.params.id);

            if(row.length > 0){

                const profissional = row[0];

                const outputPath = `${outputDir}/${profissional.uriImagemPrincipal}`;

                console.log("outputPath: " + outputPath);

                fs.unlinkSync(outputPath);

                await ProfissionalRepository.updateUrlImagem("", req.params.id);
            }

            response.message = "Foto apagada com sucesso";
            response.sucess = true;

            return res.json(response);
        } catch (error) {
            response.status = 500;
            response.message = error.message;
            return res.json(response);
        }
    }

    async GetAll(req, res) {
        const response = new RequestResponse();
        response.objeto = null;
        response.id = 0;
        response.status = 200;
        try{
            const rows = await ProfissionalRepository.findAll();
            if(rows.length > 0){
                response.message = "Sucesso";
                response.sucess = true;
                response.objeto = rows;
            }else{
                response.message = "Não existem Profissionais cadastrados";
            }
        }catch(error){
            response.status = 500;
            response.message = error.message;
        }
        res.json(response);
    }


    async findAllToCard(req, res) {
        const response = new RequestResponse();
        response.objeto = null;
        response.id = 0;
        response.status = 200;
        try{
            const rows = await ProfissionalRepository.findAllToCard();
            if(rows.length > 0){
                response.message = "Sucesso";
                response.sucess = true;
                response.objeto = rows;
            }else{
                response.message = "Não existem profissionais cadastrado";
            }
        }catch(error){
            response.status = 500;
            response.message = error.message;
        }
        res.json(response);
    }




    

}

export default new ProfissionalController();
