import {consulta} from '../database/conexao.js';

class UsuarioRepository {

    create(usuario) {
        console.log("criar usuario");
        const sql = "INSERT INTO usuario SET ?";
        return consulta(sql, usuario, "Não foi possível criar o Usuario");
    }


    findById(id) {
        console.log("obter usuario id:" + id);
        const sql = "SELECT * FROM usuario WHERE idUsuario = ?"; 
        return consulta(sql, id, "Não foi possível obter a lista de usuario");
    }
    
    
    
    findAll() {
        const sql = "SELECT * FROM usuario";
        return consulta(sql, "Não foi possível obter a lista");
    }

    update(id, usuario) {
        const sql = "UPDATE usuario SET ? WHERE id = ?";
        return consulta(sql, [selecao, id], "Não foi possível atualizar a usuario");
    }

    delete(id) {
        const sql = "DELETE FROM usuario WHERE id = ?";
        return consulta(sql, id, "Não foi possível excluir a usuario");
    }
}

export default new UsuarioRepository();
