import 'dotenv/config';
import pkg from 'pg';
const { Pool } = pkg;

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://quemindica_fwgf_user:aCkxkdtNcrUatYqSkvYIvuZQ7YZXw5eL@dpg-dbuden8m7kps73c33e4g-a/quemindica_fwgf';

const conexao = new Pool({
  connectionString: DATABASE_URL,
  ssl: {
    rejectUnauthorized: false // Render exige SSL
  },
  options: '-c search_path=quemindica,public'
});

conexao.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conexão ao banco de dados estabelecida com sucesso!');
});

/**
 * Executa uma consulta SQL no banco de dados
 * @param {string} sql instrução SQL a ser executada
 * @param {array} valores valores a serem passados para o SQL 
 * @param {string} mensagemReject mensagem a ser exibida em caso de erro
 * @returns Promise
 */
const normalizarConsultaPostgres = (sql, valores) => {
  let sqlFinal = sql;
  let parametros = valores;

  if (parametros && typeof parametros === 'object' && !Array.isArray(parametros)) {
    const colunas = Object.keys(parametros);
    if (/INSERT\s+INTO\s+\w+\s+SET\s+\?/i.test(sqlFinal)) {
      sqlFinal = sqlFinal.replace(/SET\s+\?/i, `(${colunas.join(', ')}) VALUES (${colunas.map((_, index) => `$${index + 1}`).join(', ')})`);
      parametros = Object.values(parametros);
    }
  }

  if (Array.isArray(parametros) && parametros.length > 0 && parametros[0] && typeof parametros[0] === 'object' && !Array.isArray(parametros[0])) {
    const obj = parametros[0];
    if (/UPDATE\s+\w+\s+SET\s+\?/i.test(sqlFinal)) {
      const colunas = Object.keys(obj);
      sqlFinal = sqlFinal.replace(/SET\s+\?/i, `SET ${colunas.map((coluna, index) => `${coluna} = $${index + 1}`).join(', ')}`);
      parametros = [...Object.values(obj), ...parametros.slice(1)];
    }
  }

  if (sqlFinal.includes('?')) {
    let indice = 0;
    sqlFinal = sqlFinal.replace(/\?/g, () => {
      indice += 1;
      return `$${indice}`;
    });
  }

  return { sqlFinal, parametros };
};

export const consulta = (sql, valores = [], mensagemReject) => {
  if (typeof valores === 'string') {
    mensagemReject = valores;
    valores = [];
  }

  if (valores === undefined || valores === null) {
    valores = [];
  }

  if (!Array.isArray(valores)) {
    valores = [valores];
  }

  const { sqlFinal, parametros } = normalizarConsultaPostgres(sql, valores);

  return new Promise((resolve, reject) => {
    conexao.query(sqlFinal, parametros, (error, results) => {
      if (error) {
        console.log("Erro: " + error);
        return reject(mensagemReject || 'Erro ao executar consulta SQL: ' + error);
      }
      return resolve(results.rows || results);
    });
  });
};

export default conexao;
