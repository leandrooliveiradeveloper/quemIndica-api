import {consulta} from '../database/conexao.js';

class ProfissionalRepository {

    create(profissional) {
        console.log("CONTROLLER API create profissional: " + JSON.stringify(profissional));
        const sql = "INSERT INTO profissional SET ?";
        return consulta(sql, profissional, "Não foi possível criar o Profissional");
    }
    
    findById(id) {
        console.log("CONTROLLER API findById profissional: " + id);
        const sql = "SELECT * FROM profissional WHERE idprofissional = ?"; 
        return consulta(sql, id, "Não foi possível obter a lista de profissionais");
    }    

    findByUsuarioId(id) {
        console.log("CONTROLLER API findByUsuarioId profissional: " + id);
        const sql = "SELECT * FROM profissional WHERE idusuario = ?"; 
        return consulta(sql, id, "Não foi possível obter o profissional");
    }   

    update(id, profissional) {
        console.log("CONTROLLER API update profissional: " + JSON.stringify(profissional));
        const sql = "UPDATE profissional SET ? WHERE idprofissional = ?";
        return consulta(sql, [profissional, id], "Não foi possível atualizar o profissional");
    }

    findAll() {
        console.log("CONTROLLER API findAll profissional: ");
        return consulta(sql, "Não foi possível obter a lista");
    }

    delete(id) {
        console.log("CONTROLLER API findByUsuarioId delete: " + id);
        const sql = "DELETE FROM profissional WHERE idprofissional = ?";
        return consulta(sql, id, "Não foi possível excluir o profissional");
    }

    updateUrlImagem(url, idProfissional) {
        console.log("CONTROLLER API updateUrlImagem : " + idProfissional);
        const sql = "UPDATE profissional SET uriImagemPrincipal = ? WHERE idprofissional = ?";
        return consulta(sql, [url, idProfissional], "Não foi possível atualizar o profissional");
    }
}

export default new ProfissionalRepository();
