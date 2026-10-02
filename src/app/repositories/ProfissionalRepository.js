import {consulta} from '../database/conexao.js';

class ProfissionalRepository {

    create(profissional) {
        console.log("CONTROLLER API create profissional: " + JSON.stringify(profissional));
        const sql = `
        INSERT INTO profissional (descricao,uriImagemPrincipal,telefone,disponibilidadeInicio,disponibilidadeFim,avaliacaoMedia,servico, rua,numero,bairro,estado,cidade,latitude,idusuario,cliques,status) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16) RETURNING idprofissional`;

        console.log("CONTROLLER API create profissional sql: " + sql);
        console.log("CONTROLLER API create profissional objeto: " + JSON.stringify(profissional));

        return consulta(sql, [profissional.descricao, profissional.uriImagemPrincipal, profissional.telefone, profissional.disponibilidadeInicio, 
            profissional.disponibilidadeFim, profissional.avaliacaoMedia, profissional.servico, 
            profissional.rua, profissional.numero, profissional.bairro, profissional.estado, 
            profissional.cidade, profissional.latitude, profissional.idusuario, 0, 1], 
            "Não foi possível criar o Profissional");
    }
    
    findById(id) {
        console.log("CONTROLLER API findById profissional: " + id);
        const sql = "SELECT * FROM profissional WHERE idprofissional = $1"; 
        return consulta(sql, [id], "Não foi possível obter a lista de profissionais");
    }    

    findByUsuarioId(id) {
        console.log("CONTROLLER API findByUsuarioId profissional: " + id);
        const sql = "SELECT * FROM profissional WHERE idusuario = $1"; 
        return consulta(sql, [id], "Não foi possível obter o profissional");
    }   

    update(id, profissional) {
        console.log("CONTROLLER API update profissional: " + JSON.stringify(profissional));
        const campos = Object.keys(profissional).filter((campo) => campo !== 'idprofissional' && campo !== 'id');

        const sql = `
        UPDATE profissional
        SET status = $1,
            descricao = $2,
            telefone = $3,
            disponibilidadeInicio = $4,
            disponibilidadeFim = $5,
            servico = $6,
            rua = $7,
            numero = $8,
            bairro = $9,
            cidade = $10,
            estado = $11
        WHERE idprofissional = $12
        RETURNING idprofissional
    `;

         return consulta(sql, [profissional.status, profissional.descricao, profissional.telefone,  profissional.disponibilidadeInicio, profissional.disponibilidadeFim, profissional.servico,
                                profissional.rua, profissional.numero, profissional.bairro, profissional.cidade, profissional.estado, id], "Não foi possível atualizar o profissional");
    }

    delete(id) {
        console.log("CONTROLLER API findByUsuarioId delete: " + id);
        const sql = "DELETE FROM profissional WHERE idprofissional = $1";
        return consulta(sql, [id], "Não foi possível excluir o profissional");
    }

    updateUrlImagem(url, idProfissional) {
        console.log("CONTROLLER API updateUrlImagem : " + idProfissional);
        const sql = "UPDATE profissional SET uriImagemPrincipal = $1 WHERE idprofissional = $2 RETURNING idprofissional";
        return consulta(sql, [url, idProfissional], "Não foi possível atualizar o profissional");
    }

    findAll() {
        console.log("CONTROLLER API findAll profissional: ");
        const sql = "SELECT * FROM profissional"; 
        return consulta(sql, [], "Não foi possível obter a lista");
    }

    findAllToCard() {
        console.log("CONTROLLER API findAllToCard profissional: ");
        const sql = `SELECT p.idprofissional AS id, u.nome, p.uriimagemprincipal, p.telefone, p.cidade, p.estado, p.cliques,
                    p.avaliacaoMedia, STRING_AGG(DISTINCT c.nome, ', ') AS categorias 
                    FROM profissional AS p 
                    INNER JOIN profissional_categoria AS uc ON uc.idprofissional = p.idprofissional 
                    INNER JOIN categoria AS c ON c.idcategoria = uc.idcategoria 
                    INNER JOIN usuario AS u ON u.idusuario = p.idusuario 
                    WHERE u.status = 1 
                    AND p.status = 1 
                    GROUP BY p.idprofissional, u.nome, p.uriimagemprincipal, p.telefone, p.cidade, 
                    p.estado, p.cliques, p.avaliacaoMedia 
                    ORDER BY u.nome`
        return consulta(sql, [], "Não foi possível obter a lista");
    }

    findToPerfil(id) {
        console.log("CONTROLLER API findToPerfil profissional: ");
        const sql = `SELECT p.idprofissional as id, u.nome, u.idusuario, p.uriimagemprincipal, p.telefone,
                    p.cidade, p.estado, p.servico, p.descricao, p.avaliacaoMedia, p.bairro,
                    STRING_AGG(DISTINCT c.nome, ', ') AS categorias 
                    FROM profissional AS p 
                    INNER JOIN profissional_categoria AS uc ON uc.idprofissional = p.idprofissional 
                    INNER JOIN categoria AS c ON c.idcategoria = uc.idcategoria 
                    INNER JOIN usuario AS u ON u.idusuario = p.idusuario 
                    WHERE u.status = 1 
                    AND p.idprofissional = ${id} 
                    GROUP BY p.idprofissional, u.nome, u.idusuario, p.uriimagemprincipal, p.telefone, p.cidade, 
                    p.estado, p.servico, p.descricao, p.avaliacaoMedia, p.bairro`;
        return consulta(sql, [], "Não foi possível obter a lista");
    }

    findAllFavoritoToCard(id) {
        console.log("CONTROLLER API findAllFavoritoToCard profissional: ");
        const sql = `SELECT p.idprofissional AS id, u.nome, p.uriimagemprincipal, p.telefone, p.cidade, p.estado, 
                    p.avaliacaoMedia, STRING_AGG(DISTINCT c.nome, ', ') AS categorias 
                    FROM profissional AS p 
                    INNER JOIN profissional_categoria AS uc ON uc.idprofissional = p.idprofissional 
                    INNER JOIN categoria AS c ON c.idcategoria = uc.idcategoria 
                    INNER JOIN usuario AS u ON u.idusuario = p.idusuario 
                    INNER JOIN favorito AS f ON f.idprofissional = p.idprofissional AND f.idusuario = ${id} 
                    WHERE u.status = 1 
                    AND p.status = 1 
                    GROUP BY p.idprofissional, u.nome, p.uriimagemprincipal, p.telefone, p.cidade, 
                    p.estado, p.avaliacaoMedia 
                    ORDER BY u.nome`
        return consulta(sql, [], "Não foi possível obter a lista");
    }

   updateAvaliacao(avaliacaoMedia, idProfissional) {
        console.log("CONTROLLER API updateUrlImagem : " + idProfissional);
        const sql = "UPDATE profissional SET avaliacaomedia = $1 WHERE idprofissional = $2";
        return consulta(sql, [avaliacaoMedia, idProfissional], "Não foi possível atualizar o profissional");
    }

    updateClique(id) {
        console.log("CONTROLLER API update cliques: " + id);
        const sql = "UPDATE profissional SET cliques = cliques + 1 WHERE idprofissional = $1 RETURNING cliques";
        return consulta(sql, [id], "Não foi possível atualizar os cliques do profissional");
    }


    findAllClicado() {
        console.log("CONTROLLER API findAllToCard profissional: ");
        const sql = `SELECT p.idprofissional AS id, u.nome, p.uriimagemprincipal, p.telefone, p.cidade, p.estado, p.cliques,
                    p.avaliacaoMedia, STRING_AGG(DISTINCT c.nome, ', ') AS categorias 
                    FROM profissional AS p 
                    INNER JOIN profissional_categoria AS uc ON uc.idprofissional = p.idprofissional 
                    INNER JOIN categoria AS c ON c.idcategoria = uc.idcategoria 
                    INNER JOIN usuario AS u ON u.idusuario = p.idusuario 
                    WHERE u.status = 1 
                    AND p.cliques > 0 
                    AND p.status = 1 
                    GROUP BY p.idprofissional, u.nome, p.uriimagemprincipal, p.telefone, p.cidade, 
                    p.estado, p.cliques, p.avaliacaoMedia 
                    ORDER BY p.cliques desc, u.nome`

                    console.log("CONTROLLER API findAllClicado profissional sql: " + sql);

        return consulta(sql, [], "Não foi possível obter a lista");
    }
    
}

export default new ProfissionalRepository();
