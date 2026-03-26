import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';

const port = process.env.APP_PORT;

app.listen(port, () => {
  //console.log(`Rodando na porta ${port}`);
});
