import CategoriaRepository from '../repositories/CategoriaRepository.js';
import { RequestResponse } from "../model/RequestResponse.js";
import CloudinaryService from "../utils/CloudinaryService.js";

class CategoriaController {

    async create(req, res) {

        const response = new RequestResponse();
        response.objeto = null;

        try{
            const row = await CategoriaRepository.create(req.body);
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
            const row = await CategoriaRepository.findById(req.params.id);
            
            if(row.length > 0){
                response.id = row.insertId;
                response.message = "Sucesso";
                response.sucess = true;
                response.objeto = row[0];
            }else{
                response.id = row.insertId;
                response.message = "Categoria não encontrada";
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
        response.message = "Não foi possível obter a categoria";
        response.sucess = false;
        try{
            const row = await CategoriaRepository.login(req.body.email, req.body.senha);
            if(row.length > 0){
                response.status = 200;
                response.id = row[0].idcategoria;
                response.message = "Sucesso";
                response.sucess = true;
                response.objeto = row[0];
            }else{
                response.status = 200;
                response.message = "Categoria não encontrada";
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
        const categoria = req.body;

        const response = new RequestResponse();
        response.status = 200;
        response.message = "Categoria não encontrada";
        response.sucess = false;
        response.objeto = null;
        response.id = 0;
        try{

            console.log("imagem: " + JSON.stringify(req.body));

            const oldCategoria = await CategoriaRepository.findById(req.params.id);

            if(oldCategoria.length > 0 && oldCategoria[0].senha === categoria.senha){
                const row = await CategoriaRepository.update(id, categoria);
                
                if(row.length > 0){
                    response.id = parseInt(row[0].idcategoria);
                    response.message = "Sucesso";
                    response.sucess = true;
                    response.objeto = categoria;
                }
            }
        }catch(error){
            response.status = 500;
        }
         res.json(response);
    }

    async GetAll(req, res) {
        const rows = await CategoriaRepository.findAll();
        res.json(rows);
    }
    
    async GetAllAtivos(req, res) {
        const rows = await CategoriaRepository.findAllAtivo();
        res.json(rows);
    }

    async GetAllByProfissional(req, res) {
        const rows = await CategoriaRepository.findAllByProfissional(req.params.id);
        res.json(rows);
    }


    async DeleteById(req, res) {
        const response = new RequestResponse();
        response.objeto = null;
        response.id = 0;
        response.status = 200;
        try{

            const rowImg = await CategoriaRepository.findById(req.params.id);
            if (rowImg.length > 0 && rowImg[0].imagem) {
                await CloudinaryService.deleteByUrl(rowImg[0].imagem);
            }

            const row = await CategoriaRepository.delete(req.params.id);

            console.log("APAGAR: " + JSON.stringify(row));
            
            if(row.length > 0){
                response.id = row.insertId;
                response.message = "Sucesso";
                response.sucess = true;
                response.objeto = row[0];
            }else{
                response.id = row.insertId;
                response.message = "Categoria não encontrada";
            }
        }catch(error){
            response.status = 500;
            response.message = "Error";
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

            const categoriaAtual = await CategoriaRepository.findById(req.body.id);
            if (categoriaAtual.length > 0 && categoriaAtual[0].imagem) {
                await CloudinaryService.deleteByUrl(categoriaAtual[0].imagem);
            }

            const uploadResult = await CloudinaryService.uploadFile(req.file, 'quem-indica/categoria');
            const categoriaAtualizada = categoriaAtual.length > 0 ? categoriaAtual[0] : { nome: '', status: 1 }; 

            const categoria = {
                nome: categoriaAtualizada.nome,
                status: categoriaAtualizada.status,
                imagem: uploadResult.secure_url
            };

            await CategoriaRepository.update(req.body.id, categoria);

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



}

export default new CategoriaController();
