import UsuarioRepository from '../repositories/UsuarioRepository.js';
import { RequestResponse } from "../model/RequestResponse.js";

class UsuarioController {


    async store(req, res) {

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


     async show(req, res) {
        const response = new RequestResponse();
        response.objeto = null;
        response.id = 0;
        response.status = 200;
        response.message = "Não foi possível obter o usuario";
        response.sucess = false;
        try{
            const row = await UsuarioRepository.findById(req.params.id);
            response.status = 200;
            response.id = row.insertId;
            response.message = "Sucesso";
            response.sucess = true;
            response.objeto = row[0];
        }catch(error){
            response.status = 500;
            response.id = 0;
            response.message = "Error";
            response.sucess = false;
            response.objeto = null;
        }
        res.json(response);
     }


    // async index(req, res) {
    //     const rows = await SelecaoRepository.findAll();
    //     res.json(rows);
    // }



    // async store(req, res) {
    //     const row = await SelecaoRepository.create(req.body);
    //     res.json(row);
    // }

    // async update(req, res) {
    //     const id = req.params.id;
    //     const selecao = req.body;
    //     const row = await SelecaoRepository.update(id, selecao);
    //     res.json(row);
    // }

    // async delete(req, res) {
    //     const row = await SelecaoRepository.delete(req.params.id);
    //     res.json(row);
    // }

}

export default new UsuarioController();
