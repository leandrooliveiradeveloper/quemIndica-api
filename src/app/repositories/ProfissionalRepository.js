import {consulta} from '../database/conexao.js';

class ProfissionalRepository {











    create(profissional) {
        console.log("criar profissional: " + JSON.stringify(profissional));
        const sql = "INSERT INTO profissional SET ?";
        return consulta(sql, profissional, "Não foi possível criar o Profissional");
    }
    
    findById(id) {
        console.log("obter profissional idprofissional:" + id);
        const sql = "SELECT * FROM profissional WHERE idprofissional = ?"; 
        return consulta(sql, id, "Não foi possível obter a lista de profissionais");
    }    



    findByUsuarioId(id) {
        console.log("obter profissional idusuario:" + id);
        const sql = "SELECT * FROM profissional WHERE idusuario = ?"; 
        return consulta(sql, id, "Não foi possível obter o profissional");
    }   

    update(id, profissional) {
        const sql = "UPDATE profissional SET ? WHERE idprofissional = ?";
        return consulta(sql, [profissional, id], "Não foi possível atualizar o profissional");
    }


    
    
    findAll() {
        const sql = "SELECT * FROM profissional";
        return consulta(sql, "Não foi possível obter a lista");
    }



    delete(id) {
        const sql = "DELETE FROM profissional WHERE idprofissional = ?";
        return consulta(sql, id, "Não foi possível excluir o profissional");
    }
}

export default new ProfissionalRepository();
