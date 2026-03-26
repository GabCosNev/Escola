import dotenv from 'dotenv';
dotenv.config();
import './database/index.js';
import cors from 'cors';
import helmet from 'helmet';

import express from "express";
import { resolve } from 'path';
import homeRoutes from "./routes/homeRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import alunoRoutes from "./routes/alunoRoutes.js";
import tokenRoutes from "./routes/tokenRoutes.js";
import fotoRoutes from "./routes/fotoRoutes.js";

const whitelist = [
  'http://34.176.233.157',
  'http://localhost:3000'
];

const corsOptions = {
  origin: function(origin, callback){
    if(whitelist.indexOf(origin) !== -1 || !origin){
      callback(null, true);
    } else {
      callback(new Error('Not allower by CROS'));
    }
  }
};

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(cors(corsOptions));
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(express.static(resolve(__dirname, '..', 'uploads', 'images')));
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/tokens/', tokenRoutes);
    this.app.use('/users/', userRoutes);
    this.app.use('/alunos/', alunoRoutes);
    this.app.use('/fotos/', fotoRoutes);
  }
}

export default new App().app;
