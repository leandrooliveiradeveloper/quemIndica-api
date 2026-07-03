# Getting Started

1 - npm install
2 - npm run dev


# rodar o projeto pela api no app localmente 
adb -s ZF524WXRF5 reverse tcp:3000 tcp:3000










const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
app.use(bodyParser.json({ limit: '10mb' })); // aumenta limite para imagens

app.post('/upload', (req, res) => {
  const base64Data = req.body.imagemBase64.replace(/^data:image\/png;base64,/, "");
  fs.writeFileSync("uploads/imagem.png", base64Data, 'base64');
  res.send('Imagem salva com sucesso!');
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));




