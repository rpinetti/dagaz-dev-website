import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Porta dinâmica para a Hostinger, com fallback para 3000 localmente
const PORT = process.env.PORT || 3000;

const distPath = path.join(__dirname, 'dist');
const indexPath = path.join(distPath, 'index.html');

// Log de inicialização para ajudar no diagnóstico via stderr.log
console.log(`[STARTUP] Iniciando servidor na porta ${PORT}...`);
console.log(`[STARTUP] __dirname atual: ${__dirname}`);

// Verificação de segurança para a pasta dist
if (!fs.existsSync(distPath)) {
  console.error(`[ERROR] Pasta "dist" não encontrada em: ${distPath}`);
  console.error(`[ERROR] Certifique-se de rodar "npm run build" antes do deploy ou enviar a pasta dist.`);
} else {
  console.log(`[SUCCESS] Pasta "dist" localizada.`);
}

// Servir os arquivos estáticos
app.use(express.static(distPath));

// Rota de Health Check para diagnóstico rápido (acessar /health-check)
app.get('/health-check', (req, res) => {
  res.status(200).json({
    status: 'up',
    port: PORT,
    distExists: fs.existsSync(distPath),
    indexExists: fs.existsSync(indexPath),
    time: new Date().toISOString()
  });
});

// Rota coringa ("catch-all") para o React Router funcionar (SPA)
app.get('*', (req, res) => {
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.status(404).send('ERRO: Frontend não encontrado. Verifique se a pasta "dist" foi gerada e enviada corretamente.');
  }
});

// Inicialização do servidor
const server = app.listen(PORT, () => {
  console.log(`[SUCCESS] Servidor rodando. Acesse http://localhost:${PORT}`);
});

// Tratamento de erros globais do servidor
server.on('error', (err) => {
  console.error('[SERVER CRITICAL ERROR]', err);
});
