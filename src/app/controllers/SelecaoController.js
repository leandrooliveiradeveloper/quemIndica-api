import SelecaoRepository from '../repositories/SelecaoRepository.js';

class SelecaoController {

    async index(req, res) {
        const rows = await SelecaoRepository.findAll();
        res.json(rows);
    }

    async show(req, res) {
        const row = await SelecaoRepository.findById(req.params.id);
        res.json(row);
    }

    async store(req, res) {
        const row = await SelecaoRepository.create(req.body);
        res.json(row);
    }

    async update(req, res) {
        const id = req.params.id;
        const selecao = req.body;
        const row = await SelecaoRepository.update(id, selecao);
        res.json(row);
    }

    async delete(req, res) {
        const row = await SelecaoRepository.delete(req.params.id);
        res.json(row);
    }

}

export default new SelecaoController();
