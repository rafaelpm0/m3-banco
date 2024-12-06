import {
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
} from './db.mjs';

// Criar as tabelas
 //createDB();

// Inserir um novo pagador
const novoPagador = {
  nome_completo: "Oliveira",
  email: "maria.oliveira@example.comm",
  documento: "987.654.321-000",
  telefone: "98765-4321"
};

//insertPagador(novoPagador);

// Listar todos os pagadores
async function listPagadores() {
  let data = await getPagadores();
  console.log(data);
}
//listPagadores();

// Buscar pagador por ID
async function listPagadorById() {
  let id = 1;
  let data = await getPagadorById(id);
  console.log(data);
}
//listPagadorById();

// Deletar pagador por ID
async function delPagadorById() {
  let id = 1;
  await deletePagador(id);
  console.log(`Pagador com id ${id} deletado`);
}
 //delPagadorById();

// Inserir uma nova unidade
const novaUnidade = {
  numero_identificador: "Bloco 2, Apto 101",
  localizacao: "Bloco 2, 1º Andar"
};

//insertUnidade(novaUnidade);

// Listar todas as unidades
async function listUnidades() {
  let data = await getUnidades();
  console.log(data);
}
// listUnidades();

// Buscar unidade por ID
async function listUnidadeById() {
  let id = 1;
  let data = await getUnidadeById(id);
  console.log(data);
}
// listUnidadeById();

// Deletar unidade por ID
async function delUnidadeById() {
  let id = 1;
  await deleteUnidade(id);
  console.log(`Unidade com id ${id} deletada`);
}
// delUnidadeById();

// Inserir um novo pagamento
const novoPagamento = {
  id_pagador: 1,
  data_pagamento: "2023-10-01",
  comprovante: null, // Supondo que não há comprovante no momento
  ano_referencia: 2023,
  mes_referencia: 10,
  id_unidade: 1
};

//insertPagamento(novoPagamento);

// Listar todos os pagamentos
async function listPagamentos() {
  let data = await getPagamentos();
  console.log(data);
}
// listPagamentos();

// Buscar pagamento por ID
async function listPagamentoById() {
  let id = 1;
  let data = await getPagamentoById(id);
  console.log(data);
}
// listPagamentoById();

// Deletar pagamento por ID
async function delPagamentoById() {
  let id = 1;
  await deletePagamento(id);
  console.log(`Pagamento com id ${id} deletado`);
}
// delPagamentoById();