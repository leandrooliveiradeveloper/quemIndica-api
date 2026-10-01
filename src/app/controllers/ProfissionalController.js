import ProfissionalRepository from '../repositories/ProfissionalRepository.js';
import { RequestResponse } from "../model/RequestResponse.js";
import UsuarioRepository from '../repositories/UsuarioRepository.js';
import CategoriaRepository from '../repositories/CategoriaRepository.js';
import PasswordService from "../utils/PasswordService.js";
import CloudinaryService from "../utils/CloudinaryService.js";

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
                dataCadastro: usuario.dataCadastro ?? usuario.datacadastro ?? new Date().toISOString(),
                perfil: usuario.perfil,
                senha: usuario.senha,
                status: usuario.status
            }

            const rowEmail = await UsuarioRepository.findByEmail(usuario.email);

            console.log("rowEmail: " + JSON.stringify(rowEmail));

            if(rowEmail.length == 0){

                const hashedPassword = await PasswordService.hashPassword(usuarioCreate.senha);
                const usuarioData = {
                    ...usuarioCreate,
                    senha: hashedPassword,
                    datacadastro: usuarioCreate.dataCadastro ?? new Date().toISOString()
                };
                delete usuarioData.dataCadastro;
                const newUsuario = await UsuarioRepository.create(usuarioData);

                profissional.idusuario = newUsuario[0].idusuario;

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
                    profissionalCreate.id = newProfissional[0].idprofissional;
                    console.log("newProfissional: " + JSON.stringify(newProfissional));

                    console.log("listaCategoria: " + profissional.categorias);
                    
                    profissional.categorias.forEach(async element => {
                        const adicionarUsuariocategoria = await CategoriaRepository.createByProfissional(newProfissional[0].idprofissional, element);
                        console.log("Categoria: " + element);
                        console.log("profissional.id: " + newProfissional[0].idprofissional);
                    });

                    profissionalCreate.id = newProfissional[0].idprofissional;
                    usuarioCreate.id = newUsuario[0].idusuario;
                    profissionalCreate.usuario = usuarioCreate;

                    response.status = 200;
                    response.id = newUsuario[0].idusuario;
                    response.message = "Sucesso";
                    response.sucess = true;
                    response.objeto = profissionalCreate
                }
            }else{
                response.status = 200;
                response.id = 0;
                response.message = "Este e-mail já está cadastrado em nosso sistema";
                response.sucess = false;
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
                response.id = row[0].idprofissional;
                response.message = "Sucesso";
                response.sucess = true;
                response.objeto = row[0];
            }else{
                response.id = 0;
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

            console.log("row: " + JSON.stringify(row));
            
            if(row.length > 0){
                response.id = row[0].idprofissional;
                response.message = "Sucesso";
                response.sucess = true;
                response.objeto = row[0];
            }else{
                response.id = 0;
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

            // console.log("=================================================");
            // console.log("Profissional: " + JSON.stringify(profissional));
            // console.log("=================================================");
            // console.log("usuario: " + JSON.stringify(usuario));
            // console.log("=================================================");

            const oldUsuario = await UsuarioRepository.findById(usuario.id);
            const match = await PasswordService.verifyPassword(usuario.senha, oldUsuario[0].senha);

            if(oldUsuario[0].email !== usuario.email){
                const usuarioEmail = await UsuarioRepository.findByEmail(usuario.email);
                if(usuarioEmail.length > 0){
                    response.message = "Você está tentando alterar o email de um usuário, mas este email já existe em nossa base.";
                    return res.json(response);;
                }
            }

            if(oldUsuario.length > 0 && match){

                const oldProfissional = await ProfissionalRepository.findById(profissional.id);

                const usuarioUpdate = oldUsuario[0];
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
                    latitude: profissional.latitude,
                    status: profissional.status,
                };

                if(oldProfissional.length > 0){

                    const rowUsuario = await UsuarioRepository.update(usuario.id, usuarioUpdate);
                    const row = await ProfissionalRepository.update(profissional.id, profissionalUpdate);

                    const apagarUsuarioCategoria = await CategoriaRepository.deleteByProfissional(profissional.id);

                    console.log("apagarUsuarioCategoria row: " + JSON.stringify(apagarUsuarioCategoria));

                    profissional.categorias.forEach(async element => {
                        const adicionarUsuariocategoria = await CategoriaRepository.createByProfissional(profissional.id, element);
                    });
                
                    if(row.length > 0){
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
            if (!req.file) {
                response.status = 400;
                response.message = "Nenhum arquivo enviado";
                return res.json(response);
            }

            const profissionalAtual = await ProfissionalRepository.findById(req.body.id);
            if (profissionalAtual.length > 0 && profissionalAtual[0].uriimagemprincipal) {
                await CloudinaryService.deleteByUrl(profissionalAtual[0].uriimagemprincipal);
            }

            const uploadResult = await CloudinaryService.uploadFile(req.file, 'quem-indica/profissional');

            await ProfissionalRepository.updateUrlImagem(uploadResult.secure_url, req.body.id);

            const objeto = {
                filename: req.file.originalname,
                url: uploadResult.secure_url,
                publicId: uploadResult.public_id,
                mimetype: req.file.mimetype,
                size: req.file.size,
                width: uploadResult.width,
                height: uploadResult.height
            };

            response.message = "Upload feito com sucesso";
            response.sucess = true;
            response.objeto = objeto;
            response.id = Number(req.body.id);

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
            const row = await ProfissionalRepository.findById(req.params.id);

            if (row.length > 0) {
                const profissional = row[0];

                if (profissional.uriimagemprincipal) {
                    await CloudinaryService.deleteByUrl(profissional.uriimagemprincipal);
                }

                await ProfissionalRepository.updateUrlImagem('', req.params.id);
            }

            response.message = "Foto apagada com sucesso";
            response.sucess = true;
            response.id = Number(req.params.id);

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

    async findToPerfil(req, res) {

        const response = new RequestResponse();
        response.objeto = null;
        response.id = 0;
        response.status = 200;
        try{
            const rows = await ProfissionalRepository.findToPerfil(req.params.id);
            if(rows.length > 0){
                response.message = "Sucesso";
                response.sucess = true;
                response.id = rows[0].id;
                response.objeto = rows[0];
            }else{
                response.message = "Não existe este profissional cadastrado";
            }
        }catch(error){
            response.status = 500;
            response.message = error.message;
        }
        res.json(response);
    }

    async findAllFavoritoToCard(req, res) {
        const response = new RequestResponse();
        response.objeto = null;
        response.id = 0;
        response.status = 200;

        try{
             const rows = await ProfissionalRepository.findAllFavoritoToCard(req.params.id);
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

    async updateCliques(req, res) {
        
        const id = req.params.id;
        const response = new RequestResponse();
        response.status = 200;
        response.message = "Usuario não encontrado";
        response.sucess = false;
        response.objeto = null;
        response.id = 0;

        try{

            const cliques = await ProfissionalRepository.updateClique(id);
            if(cliques.length > 0){
                response.id = parseInt(cliques[0].cliques);
                response.message = "Sucesso";
                response.sucess = true;
            }
           
        }catch(error){
            response.status = 500;
            response.message = error;
        }
         res.json(response);
    }
    

    async findAllClicados(req, res) {
        const response = new RequestResponse();
        response.objeto = null;
        response.id = 0;
        response.status = 200;
        try{
            const rows = await ProfissionalRepository.findAllClicado();
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
