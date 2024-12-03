import express from 'express';
import multer from 'multer';
import { insertDivida, getDividas, getDividasById, deleteDividaById } from '../DB/db.mjs';

const router = express.Router();
const upload = multer();

// Rota para inserir uma nova dívida
router.post('/', upload.single('arquivo_comprovante'), async (req, res) => {
  try {
    const novaDivida = {
      nome_cliente: req.body.nome_cliente,
      cpf_cliente: req.body.cpf_cliente,
      email_cliente: req.body.email_cliente,
      cep: req.body.cep,
      numero: req.body.numero,
      complemento: req.body.complemento,
      valor: req.body.valor,
      descricao: req.body.descricao,
      situacao: req.body.situacao,
      numero_processo: req.body.numero_processo,
      arquivo_comprovante: req.file ? req.file.buffer : null,
      arquivo_comprovante_name: req.file ? req.file.originalname : null,
    };
    console.log(novaDivida);
    console.log(req.file)
    const id = await insertDivida(novaDivida);
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para listar todas as dívidas
router.get('/', async (req, res) => {
  try {
    const dividas = await getDividas();
    res.status(200).json(dividas);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para listar uma dívida específica por ID
router.get('/:id', async (req, res) => {
  try {
    const divida = await getDividasById(id);
    if (divida) {
      res.status(200).json(divida);
    } else {
      res.status(404).json({ error: 'Dívida não encontrada' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rota para deletar uma dívida específica por ID
router.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const result = await deleteDividaById(id);
    if (result.changes > 0) {
      res.status(200).json({ message: `Dívida com ID ${id} deletada` });
    } else {
      res.status(404).json({ error: 'Dívida não encontrada' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;