import CategoriaRepository from '../repositories/CategoriaRepository.js';
import { RequestResponse } from "../model/RequestResponse.js";

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

            const oldCategoria = await CategoriaRepository.findById(req.params.id);
            console.log("oldCategoria", oldCategoria);
            console.log("categoria", categoria);

            if(oldCategoria.length > 0 && oldCategoria[0].senha === categoria.senha){
                const row = await CategoriaRepository.update(id, categoria);
                if(row.affectedRows > 0){
                    response.id = parseInt(id);
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


}

export default new CategoriaController();
