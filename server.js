import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Porta dinâmica para a Hostinger, com fallback para 3000 localmente
const PORT = process.env.PORT || 3000;

// Servir os arquivos estáticos da pasta dist gerada pelo Vite
app.use(express.static(path.join(__dirname, 'dist')));

// Rota coringa ("catch-all") para o React Router funcionar (SPA)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// A Hostinger exige que o servidor escute em 0.0.0.0
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://0.0.0.0:${PORT}`);
});
