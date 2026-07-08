import app from './app.js';

const PORT = process.env.PORT;
const URL_API = process.env.URL_API;

app.listen(PORT, () => {
  console.log(`Endereço da API no endereço e PORT on port ${URL_API}:${PORT}`);
});
