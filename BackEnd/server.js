import express from 'express';
import cors from 'cors';
import { createDB } from './DB/db.mjs';
import router from './API/api.js';

const app = express();
const port = 5000;

app.use(cors({
  origin: '*'
}));

app.use(express.json());

// Inicializar o banco de dados
createDB();

// Usar o router para as rotas de dívidas
app.use('/api', router);

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});