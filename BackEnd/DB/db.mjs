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
      `CREATE TABLE IF NOT EXISTS Pagador (
        id_pagador INT AUTO_INCREMENT PRIMARY KEY,
        nome_completo VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        documento VARCHAR(20) NOT NULL UNIQUE,
        telefone VARCHAR(15) NOT NULL
      )`
    );
    console.log('Tabela "Pagador" criada ou já existe.');

    await connection.execute(
      `CREATE TABLE IF NOT EXISTS Unidade (
        id_unidade INT AUTO_INCREMENT PRIMARY KEY,
        numero_identificador VARCHAR(50) NOT NULL,
        localizacao VARCHAR(255) NOT NULL
      )`
    );
    console.log('Tabela "Unidade" criada ou já existe.');

    await connection.execute(
      `CREATE TABLE IF NOT EXISTS Pagamento (
        id_pagamento INT AUTO_INCREMENT PRIMARY KEY,
        id_pagador INT NOT NULL,
        data_pagamento DATE NOT NULL,
        comprovante LONGBLOB,
        ano_referencia YEAR NOT NULL,
        mes_referencia TINYINT NOT NULL,
        id_unidade INT NOT NULL,
        data_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (id_pagador) REFERENCES Pagador(id_pagador) ON DELETE CASCADE,
        FOREIGN KEY (id_unidade) REFERENCES Unidade(id_unidade) ON DELETE CASCADE
      )`
    );
    console.log('Tabela "Pagamento" criada ou já existe.');
  } catch (err) {
    throw new Error('Erro ao criar as tabelas: ' + err.message);
  } finally {
    await closeConnection(connection);
  }
}

// Funções para a tabela Pagador
async function insertPagador(pagador) {
  const connection = await connect();
  try {
    const [result] = await connection.execute(
      `CALL InsertPagador(?, ?, ?, ?)`,
      [pagador.nome_completo, pagador.email, pagador.documento, pagador.telefone]
    );
    console.log(`Novo pagador adicionado com o id ${result.insertId}`);
    return result.insertId;
  } catch (err) {
    throw new Error('Erro ao inserir o pagador: ' + err.message);
  } finally {
    await closeConnection(connection);
  }
}

async function getPagadores() {
  const connection = await connect();
  try {
    const [rows] = await connection.execute(`SELECT * FROM Pagador`);
    return rows;
  } catch (err) {
    throw new Error('Erro ao buscar os pagadores: ' + err.message);
  } finally {
    await closeConnection(connection);
  }
}

async function getPagadorById(id) {
  const connection = await connect();
  try {
    const [rows] = await connection.execute(`CALL GetPagamentosID(?)`, [id]);
    return rows[0];
  } catch (err) {
    throw new Error('Erro ao buscar o pagador: ' + err.message);
  } finally {
    await closeConnection(connection);
  }
}

async function deletePagador(id) {
  const connection = await connect();
  try {
    await connection.execute(`CALL DelPagador(?)`, [id]);
    console.log(`Pagador com id ${id} deletado`);
  } catch (err) {
    throw new Error('Erro ao deletar o pagador: ' + err.message);
  } finally {
    await closeConnection(connection);
  }
}

// Funções para a tabela Unidade
async function insertUnidade(unidade) {
  const connection = await connect();
  try {
    const [result] = await connection.execute(
      `INSERT INTO Unidade (numero_identificador, localizacao) VALUES (?, ?)`,
      [unidade.numero_identificador, unidade.localizacao]
    );
    console.log(`Nova unidade adicionada com o id ${result.insertId}`);
    return result.insertId;
  } catch (err) {
    throw new Error('Erro ao inserir a unidade: ' + err.message);
  } finally {
    await closeConnection(connection);
  }
}

async function getUnidades() {
  const connection = await connect();
  try {
    const [rows] = await connection.execute(`SELECT * FROM Unidade`);
    return rows;
  } catch (err) {
    throw new Error('Erro ao buscar as unidades: ' + err.message);
  } finally {
    await closeConnection(connection);
  }
}

async function getUnidadeById(id) {
  const connection = await connect();
  try {
    const [rows] = await connection.execute(`SELECT * FROM Unidade WHERE id_unidade = ?`, [id]);
    return rows[0];
  } catch (err) {
    throw new Error('Erro ao buscar a unidade: ' + err.message);
  } finally {
    await closeConnection(connection);
  }
}

async function deleteUnidade(id) {
  const connection = await connect();
  try {
    await connection.execute(`DELETE FROM Unidade WHERE id_unidade = ?`, [id]);
    console.log(`Unidade com id ${id} deletada`);
  } catch (err) {
    throw new Error('Erro ao deletar a unidade: ' + err.message);
  } finally {
    await closeConnection(connection);
  }
}

// Funções para a tabela Pagamento
async function insertPagamento(pagamento) {
  const connection = await connect();
  try {
    const [result] = await connection.execute(
      `INSERT INTO Pagamento (id_pagador, data_pagamento, comprovante, ano_referencia, mes_referencia, id_unidade) VALUES (?, ?, ?, ?, ?, ?)`,
      [
        pagamento.id_pagador,
        pagamento.data_pagamento,
        pagamento.comprovante,
        pagamento.ano_referencia,
        pagamento.mes_referencia,
        pagamento.id_unidade
      ]
    );
    console.log(`Novo pagamento adicionado com o id ${result.insertId}`);
    return result.insertId;
  } catch (err) {
    throw new Error('Erro ao inserir o pagamento: ' + err.message);
  } finally {
    await closeConnection(connection);
  }
}

async function getPagamentos() {
  const connection = await connect();
  try {
    const [rows] = await connection.execute(`CALL GetPagamentos()`);
    return rows;
  } catch (err) {
    throw new Error('Erro ao buscar os pagamentos: ' + err.message);
  } finally {
    await closeConnection(connection);
  }
}

async function getPagamentoById(id) {
  const connection = await connect();
  try {
    const [rows] = await connection.execute(`SELECT * FROM Pagamento WHERE id_pagamento = ?`, [id]);
    return rows[0];
  } catch (err) {
    throw new Error('Erro ao buscar o pagamento: ' + err.message);
  } finally {
    await closeConnection(connection);
  }
}

async function deletePagamento(id) {
  const connection = await connect();
  try {
    await connection.execute(`CALL DelPagamentos(?)`, [id]);
    console.log(`Pagamento com id ${id} deletado`);
  } catch (err) {
    throw new Error('Erro ao deletar o pagamento: ' + err.message);
  } finally {
    await closeConnection(connection);
  }
}

export {
  createDB,
  insertPagador,
  getPagadores,
  getPagadorById,
  deletePagador,
  insertUnidade,
  getUnidades,
  getUnidadeById,
  deleteUnidade,
  insertPagamento,
  getPagamentos,
  getPagamentoById,
  deletePagamento
};