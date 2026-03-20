import { Sequelize } from "sequelize";
import databaseConfig from "../config/database.js";
import Aluno from '../models/Aluno.js';
import User from '../models/User.js';
import Fotos from '../models/Foto.js';

const models = [Aluno, User, Fotos];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach((model) => model.associate && model.associate(connection.models));

