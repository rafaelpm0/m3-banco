
import { createDB, insertDivida, getDividas, getDividasById, deleteDividaById } from './db.mjs';

// Criar a tabela dividas
//createDB();

// Inserir uma nova divida
const novaDivida = {
  nome_cliente: "João Silva",
  cpf_cliente: "123.456.789-00",
  email_cliente: "joao.silva@example.com",
  cep: "12345-678",
  numero: "123",
  complemento: "Apto 101",
  valor: 1500.00,
  descricao: "Empréstimo pessoal",
  situacao: "Pendente",
  numero_processo: "123456789",
  arquivo_comprovante: "comprovante.pdf"
};

insertDivida(novaDivida);

// Listar todas as dividas
//console.log("Listando todas as dividas:");

async function listDividas() {
    let data = await getDividas();
    console.log(data);
}
//listDividas();


async function listDividasbyID() {
    let id = 1;
    let data = await getDividasById(id);
    console.log(data);
}
//listDividasbyID();

async function delDividaById() {
    let id = 1;
    let data = await deleteDividaById(id);
    console.log(data);
}
//delDividaById(1);