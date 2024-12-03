import express from 'express';
import multer from 'multer';
import {
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
} from '../DB/db.mjs';

const router = express.Router();
const upload = multer();

// Rotas para a tabela Pagador
router.post('/pagadores', async (req, res) => {
  try {
    const novoPagador = req.body;
    const id = await insertPagador(novoPagador);
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/pagadores', async (req, res) => {
  try {
    const pagadores = await getPagadores();
    res.status(200).json(pagadores);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/pagadores/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const pagador = await getPagadorById(id);
    if (pagador) {
      res.status(200).json(pagador);
    } else {
      res.status(404).json({ error: 'Pagador não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/pagadores/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await deletePagador(id);
    res.status(200).json({ message: `Pagador com ID ${id} deletado` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rotas para a tabela Unidade
router.post('/unidades', async (req, res) => {
  try {
    const novaUnidade = req.body;
    const id = await insertUnidade(novaUnidade);
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/unidades', async (req, res) => {
  try {
    const unidades = await getUnidades();
    res.status(200).json(unidades);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/unidades/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const unidade = await getUnidadeById(id);
    if (unidade) {
      res.status(200).json(unidade);
    } else {
      res.status(404).json({ error: 'Unidade não encontrada' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/unidades/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await deleteUnidade(id);
    res.status(200).json({ message: `Unidade com ID ${id} deletada` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Rotas para a tabela Pagamento
router.post('/pagamentos', upload.single('arquivo_comprovante'), async (req, res) => {
  try {
    const novoPagamento = {
      id_pagador: req.body.id_pagador,
      data_pagamento: req.body.data_pagamento,
      comprovante: req.file ? req.file.buffer : null,
      ano_referencia: req.body.ano_referencia,
      mes_referencia: req.body.mes_referencia,
      id_unidade: req.body.id_unidade
    };
    const id = await insertPagamento(novoPagamento);
    res.status(201).json({ id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/pagamentos', async (req, res) => {
  try {
    const pagamentos = await getPagamentos();
    res.status(200).json(pagamentos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/pagamentos/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const pagamento = await getPagamentoById(id);
    if (pagamento) {
      res.status(200).json(pagamento);
    } else {
      res.status(404).json({ error: 'Pagamento não encontrado' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/pagamentos/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await deletePagamento(id);
    res.status(200).json({ message: `Pagamento com ID ${id} deletado` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;