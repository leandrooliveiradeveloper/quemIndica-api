import AvaliacaoRepository from '../repositories/AvaliacaoRepository.js';
import ProfissionalRepository from '../repositories/ProfissionalRepository.js';
import { RequestResponse } from "../model/RequestResponse.js";
import { AvaliacaoResponse } from '../model/AvaliacaoResponse.js';

class AvaliacaoController {


    async create(req, res) {

        const response = new RequestResponse();
        response.objeto = null;

        const objeto = req.body;

        try{
            const row = await AvaliacaoRepository.create(objeto);
            response.status = 200;
            response.id = row.insertId;
            response.message = "Sucesso";
            response.sucess = true;

            const rowMedia = await AvaliacaoRepository.findResumoAvaliacaoByProfssional(objeto.idprofissional);

            if(rowMedia.length > 0){
                const media = rowMedia[0].total > 0 ? rowMedia[0].estrelas / rowMedia[0].total : 0;
                const rowProfissional = await ProfissionalRepository.updateAvaliacao(media, objeto.idprofissional);
            }

        }catch(error){
            response.status = 500;
            response.id = 0;
            response.message = `Error:  + ${error}`;
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
            const row = await AvaliacaoRepository.findById(req.params.id);
            
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

   

    async getByIdProfissional(req, res) {
        const response = new RequestResponse();
        response.objeto = null;
        response.id = parseInt(req.params.id);
        response.status = 200;

        try{
            const row = await AvaliacaoRepository.findByIdProfissional(req.params.id);
            const resumo = await AvaliacaoRepository.findResumoAvaliacaoByProfssional(req.params.id);

            const avaliacaoResponse = new AvaliacaoResponse();
            avaliacaoResponse.id = parseInt(req.params.id);
            avaliacaoResponse.avaliacoes = row;
            avaliacaoResponse.estrela = 0;

            if(resumo.length > 0){
                avaliacaoResponse.estrela = resumo[0].total > 0 ? resumo[0].estrelas / resumo[0].total : 0;
            }
            
            if(row.length > 0){
                response.message = "Sucesso";
                response.sucess = true;
                response.objeto = avaliacaoResponse;
            }else{
                response.message = "Usuário ou senha inválidos";
            }
        }catch(error){
            response.sucess = false;
            response.status = 500;
            response.message = "Error: " + error;
        }
        res.json(response);
     }

}

export default new AvaliacaoController();
