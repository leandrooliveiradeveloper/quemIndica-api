import {consulta} from '../database/conexao.js';

class CategoriaRepository {

    create(categoria) {
        console.log("criar categoria");
        const sql = "INSERT INTO categoria SET ?";
        return consulta(sql, categoria, "Não foi possível criar a Categoria");
    }

    findById(id) {
        console.log("obter categoria id:" + id);
        const sql = "SELECT * FROM categoria WHERE idcategoria = ?"; 
        return consulta(sql, id, "Não foi possível obter a lista de categoria");
    }    

    update(id, categoria) {
        const sql = "UPDATE categoria SET ? WHERE idcategoria = ?";
        return consulta(sql, [categoria, id], "Não foi possível atualizar a categoria");
    }
    
    findAll() {
        const sql = "SELECT * FROM categoria WHERE status = 1 ORDER BY nome";
        return consulta(sql, "Não foi possível obter a lista");
    }

    delete(id) {
        const sql = "DELETE FROM categoria WHERE idcategoria = ?";
        return consulta(sql, id, "Não foi possível excluir a categoria");
    }
}

export default new CategoriaRepository();
