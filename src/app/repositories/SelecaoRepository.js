import {consulta} from '../database/conexao.js';

class SelecaoRepository {

    create(selecao) {
        const sql = "INSERT INTO selecoes SET ?";
        return consulta(sql, selecao, "Não foi possível criar a seleção");
    }
    
    findAll() {
        const sql = "SELECT * FROM selecoes";
        return consulta(sql, "Não foi possível obter a lista");
    }

    findById(id) {
        const sql = "SELECT * FROM selecoes WHERE id = ?"; 
        return consulta(sql, id, "Não foi possível obter a lista de seleções");
    }

    update(id, selecao) {
        const sql = "UPDATE selecoes SET ? WHERE id = ?";
        return consulta(sql, [selecao, id], "Não foi possível atualizar a seleção");
    }

    delete(id) {
        const sql = "DELETE FROM selecoes WHERE id = ?";
        return consulta(sql, id, "Não foi possível excluir a seleção");
    }
}

export default new SelecaoRepository();
