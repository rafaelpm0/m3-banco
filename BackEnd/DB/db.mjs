import mysql from 'mysql2/promise';

// Configurações de conexão com o banco de dados MySQL
const dbConfig = {
  host: '127.0.0.1',
  user: 'root',
  password: '1234',
  database: 'baguncinha'
};

// Conectar ao banco de dados MySQL
async function connect() {
  try {
    const connection = await mysql.createConnection(dbConfig);
    console.log('Conectado ao banco de dados MySQL.');
    return connection;
  } catch (err) {
    throw new Error('Erro ao conectar ao banco de dados MySQL: ' + err.message);
  }
}

// Fechar a conexão com o banco de dados
async function closeConnection(connection) {
  try {
    await connection.end();
    console.log('Fechada a conexão com o banco de dados MySQL.');
  } catch (err) {
    throw new Error('Erro ao fechar a conexão com o banco de dados MySQL: ' + err.message);
  }
}

async function createDB() {
  const connection = await connect();
  try {
    await connection.execute(
      `CREATE TABLE IF NOT EXISTS dividas (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome_cliente VARCHAR(255) NOT NULL,
        cpf_cliente VARCHAR(14) NOT NULL,
        email_cliente VARCHAR(255) NOT NULL,
        cep VARCHAR(10),
        numero VARCHAR(10),
        complemento VARCHAR(255),
        valor DECIMAL(10, 2) NOT NULL,
        descricao TEXT NOT NULL,
        situacao VARCHAR(50) NOT NULL,
        numero_processo VARCHAR(50),
        arquivo_comprovante_name VARCHAR(255),
        arquivo_comprovante LONGBLOB
      )`
    );
    console.log('Tabela "dividas" criada ou já existe.');
  } catch (err) {
    throw new Error('Erro ao criar a tabela: ' + err.message);
  } finally {
    await closeConnection(connection);
  }
}

async function insertDivida(divida) {
  const connection = await connect();
  try {
    const [result] = await connection.execute(
      `INSERT INTO dividas (nome_cliente, cpf_cliente, email_cliente, cep, numero, complemento, valor, descricao, situacao, numero_processo, arquivo_comprovante_name, arquivo_comprovante) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        divida.nome_cliente,
        divida.cpf_cliente,
        divida.email_cliente,
        divida.cep,
        divida.numero,
        divida.complemento,
        divida.valor,
        divida.descricao,
        divida.situacao,
        divida.numero_processo,
        divida.arquivo_comprovante_name,
        divida.arquivo_comprovante,
      ]
    );
    console.log(`Nova divida adicionada com o id ${result.insertId}`);
    return result.insertId;
  } catch (err) {
    throw new Error('Erro ao inserir a dívida: ' + err.message);
  } finally {
    await closeConnection(connection);
  }
}

async function getDividas() {
  const connection = await connect();
  try {
    const [rows] = await connection.execute(`SELECT * FROM dividas`);
    return rows;
  } catch (err) {
    throw new Error('Erro ao buscar as dívidas: ' + err.message);
  } finally {
    await closeConnection(connection);
  }
}

async function getDividasById(id) {
  const connection = await connect();
  try {
    const [rows] = await connection.execute(`SELECT * FROM dividas WHERE id = ?`, [id]);
    return rows[0];
  } catch (err) {
    throw new Error('Erro ao buscar a dívida: ' + err.message);
  } finally {
    await closeConnection(connection);
  }
}

async function deleteDividaById(id) {
  const connection = await connect();
  try {
    const [result] = await connection.execute(`DELETE FROM dividas WHERE id = ?`, [id]);
    return { changes: result.affectedRows };
  } catch (err) {
    throw new Error('Erro ao deletar a dívida: ' + err.message);
  } finally {
    await closeConnection(connection);
  }
}

export { createDB, insertDivida, getDividas, getDividasById, deleteDividaById };