import {consulta} from '../database/conexao.js';

class UsuarioRepository {

    create(usuario) {
        console.log("criar usuario");
        const sql = "INSERT INTO usuario SET ?";
        return consulta(sql, usuario, "Não foi possível criar o Usuario");
    }

    findById(id) {
        console.log("obter usuario id:" + id);
        const sql = "SELECT idusuario, nome, email, dataCadastro, perfil, status, senha FROM usuario WHERE idusuario = ?"; 
        return consulta(sql, id, "Não foi possível obter a lista de usuario");
    }    

    login(email, senha) {
        console.log("logar usuario");
        const sql = "SELECT idusuario, nome, email, dataCadastro, perfil, status FROM usuario WHERE email = ? and senha = ?";
        return consulta(sql, [email, senha], "Não foi possível obter Usuario");
    }

    update(id, usuario) {
        const sql = "UPDATE usuario SET ? WHERE idusuario = ?";
        return consulta(sql, [usuario, id], "Não foi possível atualizar a usuario");
    }

    findAll() {
        const sql = "SELECT * FROM usuario";
        return consulta(sql, "Não foi possível obter a lista");
    }

    delete(id) {
        const sql = "DELETE FROM usuario WHERE idusuario = ?";
        return consulta(sql, id, "Não foi possível excluir a usuario");
    }


    findFavorito(idprofissional, idusuario) {
        console.log("findFavorito");
        const sql = "SELECT * FROM favorito WHERE idprofissional = ? AND idusuario = ?"; 
        return consulta(sql, [idprofissional, idusuario], "Não foi possível obter o favorito");
    }   

    createFavorito(idprofissional, idusuario) {
        console.log("criar favorito");
        const sql = "INSERT INTO favorito SET idprofissional = ?, idusuario = ?";
        return consulta(sql, [idprofissional, idusuario], "Não foi possível criar o favorito");
    }

    deleteFavorito(idprofissional, idusuario) {
        console.log("deletar favorito");
        const sql = "DELETE FROM favorito WHERE idprofissional = ? AND idusuario = ?";
        return consulta(sql, [idprofissional, idusuario], "Não foi possível criar o favorito");
    }

}

export default new UsuarioRepository();
