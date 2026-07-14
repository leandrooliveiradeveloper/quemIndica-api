import {consulta} from '../database/conexao.js';

class AvaliacaoRepository {

    create(avaliacao) {
        console.log("criar avaliacao");
        const sql = "INSERT INTO avaliacao SET ?";
        return consulta(sql, avaliacao, "Não foi possível criar o avaliacao");
    }

    findById(id) {
        console.log("obter avaliacao id:" + id);
        const sql = "SELECT * FROM avaliacao WHERE idavaliacao = ?"; 
        return consulta(sql, id, "Não foi possível obter a lista de avaliacao");
    }    

    findByIdProfissional(id) {
        console.log("obter avaliacao id:" + id);
        const sql = "SELECT u.nome, a.idavaliacao as id, a.estrelas, a.comentario, a.data, a.idusuario, a.idprofissional " +
                    "FROM avaliacao AS a " +
                    "INNER JOIN usuario AS u ON u.idusuario = a.idusuario " +
                    "WHERE a.idprofissional = ?"; 
        return consulta(sql, id, "Não foi possível obter a lista de avaliacao");
    } 

    findResumoAvaliacaoByProfssional(id) {
        console.log("obter avaliacao id:" + id);
        const sql = "SELECT COUNT(*) AS total, SUM(estrelas) AS estrelas FROM Avaliacao WHERE idprofissional = ?"; 
        return consulta(sql, id, "Não foi possível obter a lista de avaliacao");
    } 

}

export default new AvaliacaoRepository();
