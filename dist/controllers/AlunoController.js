"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Alunojs = require('../models/Aluno.js'); var _Alunojs2 = _interopRequireDefault(_Alunojs);
var _Fotojs = require('../models/Foto.js'); var _Fotojs2 = _interopRequireDefault(_Fotojs);

class AlunoController {
  //create
  async store(req, res) {
    try {
      const novoAluno = await _Alunojs2.default.create(req.body);
      const { id, nome, idade, sobrenome, altura, peso, email } = novoAluno;
      return res.json({ id, nome, idade, sobrenome, altura, peso, email });
    }
    catch (e) {
      res.status(400).json({
        errors: e.errors.map(err => err.message)
      });
    }
  }
  //index
  async index(req, res) {
    try {
      const alunos = await _Alunojs2.default.findAll({
        attributes: ['id', 'nome', 'sobrenome', 'idade', 'altura', 'peso', 'email'],
        order: [['id', 'DESC'], [_Fotojs2.default, 'id', 'DESC']],
        include: {
          model: _Fotojs2.default,
          attributes: ['url', 'filename'],
        }
      });
      return res.json(alunos);
    }
    catch (e) {
      res.status(400).json({
        errors: e.errors.map(err => err.message)
      });
    }
  }
  //show
  async show(req, res) {
    try {
      const aluno = await _Alunojs2.default.findByPk(req.params.id, {
        attributes: ['id', 'nome', 'sobrenome', 'idade', 'altura', 'peso', 'email'],
        include: {
          model: _Fotojs2.default,
          attributes: ['url', 'filename'],
        },
        order: [[_Fotojs2.default, 'id', 'DESC']]
      });

      return res.json(aluno);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map(err => err.message)
      });
    }
  }
  //update
  async update(req, res) {
    try {

      const aluno = await _Alunojs2.default.findByPk(req.params.id);

      if (!aluno) {
        return res.status(400).json({
          errors: ['Usuário não existe'],
        });
      }

      const novosDados = await aluno.update(req.body);

      const { id, nome, sobrenome, idade, altura, peso, email } = novosDados;
      return res.json({ id, nome, sobrenome, idade, altura, peso, email });

    }
    catch (e) {
      res.status(400).json({
        errors: e.errors.map(err => err.message)
      });
    }
  }
  //delete
  async delete(req, res) {
    try {

      const aluno = await _Alunojs2.default.findByPk(req.params.id);

      await aluno.destroy(req.body);

      return (res.json(null));
    }
    catch (e) {
      res.status(400).json({
        errors: e.errors.map(err => err.message)
      });
    }
  }
}

exports. default = new AlunoController();
