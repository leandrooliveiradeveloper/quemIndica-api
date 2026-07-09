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

    findAll() {
        console.log("CONTROLLER API findAll profissional: ");
        const sql = "SELECT * FROM profissional"; 
        return consulta(sql, "Não foi possível obter a lista");
    }


    findAllToCard() {
        console.log("CONTROLLER API findAllToCard profissional: ");
        const sql = `SELECT p.idprofissional AS id, u.nome, p.uriImagemPrincipal, p.telefone, p.cidade, p.estado, 
                    p.avaliacaoMedia, GROUP_CONCAT(c.nome SEPARATOR ', ') AS categorias 
                    FROM profissional AS p 
                    INNER JOIN profissional_categoria AS uc ON uc.idprofissional = p.idprofissional 
                    INNER JOIN categoria AS c ON c.idcategoria = uc.idcategoria 
                    INNER JOIN usuario AS u ON u.idusuario = p.idusuario 
                    WHERE u.status = 1 
                    GROUP BY p.idprofissional, u.nome, p.uriImagemPrincipal, p.telefone, p.cidade, 
                    p.estado, p.avaliacaoMedia 
                    ORDER BY u.nome`
        return consulta(sql, "Não foi possível obter a lista");
    }


    findToPerfil(id) {
        console.log("CONTROLLER API findToPerfil profissional: ");
        const sql = `SELECT p.idprofissional as id, u.nome, p.uriImagemPrincipal, p.telefone,
                    p.cidade, p.estado, p.servico, p.descricao, p.avaliacaoMedia, p.bairro,
                    GROUP_CONCAT(c.nome SEPARATOR ', ') AS categorias 
                    FROM profissional AS p 
                    INNER JOIN profissional_categoria AS uc ON uc.idprofissional = p.idprofissional 
                    INNER JOIN categoria AS c ON c.idcategoria = uc.idcategoria 
                    INNER JOIN usuario AS u ON u.idusuario = p.idusuario 
                    WHERE u.status = 1 
                    AND p.idprofissional = ${id} 
                    GROUP BY p.idprofissional, u.nome, p.uriImagemPrincipal, p.telefone, p.cidade, 
                    p.estado, p.servico, p.descricao, p.avaliacaoMedia, p.bairro`;
        return consulta(sql, "Não foi possível obter a lista");
    }

    findAllFavoritoToCard(id) {
        console.log("CONTROLLER API findAllFavoritoToCard profissional: ");
        const sql = `SELECT p.idprofissional AS id, u.nome, p.uriImagemPrincipal, p.telefone, p.cidade, p.estado, 
                    p.avaliacaoMedia, GROUP_CONCAT(c.nome SEPARATOR ', ') AS categorias 
                    FROM profissional AS p 
                    INNER JOIN profissional_categoria AS uc ON uc.idprofissional = p.idprofissional 
                    INNER JOIN categoria AS c ON c.idcategoria = uc.idcategoria 
                    INNER JOIN usuario AS u ON u.idusuario = p.idusuario 
                    INNER JOIN favorito AS f ON f.idprofissional = p.idprofissional AND f.idusuario = ${id} 
                    WHERE u.status = 1 
                    GROUP BY p.idprofissional, u.nome, p.uriImagemPrincipal, p.telefone, p.cidade, 
                    p.estado, p.avaliacaoMedia 
                    ORDER BY u.nome`
        return consulta(sql, "Não foi possível obter a lista");
    }












    
}

export default new ProfissionalRepository();
