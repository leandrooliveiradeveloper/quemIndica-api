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
    
    findAllByProfissional(id) {
        const sql = "SELECT c.idcategoria FROM profissional as u " +
                    "INNER JOIN profissional_categoria as uc on uc.idprofissional = u.idprofissional " +
                    "INNER JOIN categoria as c on c.idcategoria = uc.idcategoria " +
                    "WHERE u.idprofissional = ?";
        return consulta(sql, id, "Não foi possível obter a lista");
    }

    delete(id) {
        const sql = "DELETE FROM categoria WHERE idcategoria = ?";
        return consulta(sql, id, "Não foi possível excluir a categoria");
    }


    createByProfissional(idprofissional, idcategoria) {
        console.log("criar profissional_categoria");
        const sql = "INSERT INTO profissional_categoria (idprofissional, idcategoria) VALUES (?, ?)";
        return consulta(sql, [idprofissional, idcategoria], "Não foi possível criar o profissional_Categoria");
    }

    deleteByProfissional(id) {
        const sql = "DELETE FROM profissional_categoria WHERE idprofissional = ?";
        return consulta(sql, id, "Não foi possível excluir o Profissional_Categoria");
    }


}

export default new CategoriaRepository();
