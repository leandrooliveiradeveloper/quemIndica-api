import mysql from 'mysql';

const conexao = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'quemindica'
});

conexao.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conexão ao banco de dados estabelecida com sucesso!');
});

/**
 * execjuta uma consulta SQL no banco de dados
 * @param {string} sql instrução SQL a ser executada
 * @param {string=id | [selecao, id]} valores a ser passados para o SQL 
 * @param {string} mensagemReject mensagem a ser exibida em caso de erro
 * @returns 
 */

export const consulta = (sql, valores='', mensagemReject) => {
  return new Promise((resolve, reject) => {
      conexao.query(sql, valores, (error, results) => {
          if (error) {
              console.log("Erro: " + error);
              return reject(mensagemReject || 'Erro ao executar consulta SQL: ' + error);
          }
          return resolve(results);
      });
  });
}


export default conexao;
